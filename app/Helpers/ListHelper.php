<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ListHelper
{
    /**
     * Cache TTL in minutes
     */
    private const CACHE_TTL = 60 * 24; // 24 hours

    /**
     * Generates a standardized cache key for a list
     *
     * @param string $list List name
     * @return string Cache key
     */
    private static function generateCacheKey(string $list): string
    {
        return "erp_list_{$list}";
    }

    /**
     * Makes an HTTP request to the API
     *
     * @param string $url URL to request
     * @return array Response data
     * @throws \Exception
     */
    private static function makeApiRequest(string $url): array
    {
        try {
            $response = Http::timeout(10)
                ->connectTimeout(5)
                ->withoutVerifying()
                ->get($url);

            if ($response->successful()) {
                return $response->json() ?? [];
            }

            throw new \Exception("HTTP Error: {$response->status()}");
        } catch (\Exception $e) {
            throw new \Exception("API Request failed: {$e->getMessage()}");
        }
    }

    /**
     * Gets a list from ERP with cache management
     *
     * @param string $list List name to retrieve
     * @param string|null $baseUrl Optional base URL (if not using config)
     * @return array List data
     */
    public static function getERPList(string $list, ?string $baseUrl = null, ?bool $removeEmpty = true): array
    {
        if (empty($list)) {
            return [];
        }

        $cacheKey = self::generateCacheKey($list);

        // Try to get from cache first
        $cachedData = Cache::get($cacheKey);
        if ($cachedData !== null) {
            return $cachedData;
        }

        try {
            // Use config base_url if no baseUrl provided
            $baseUrl = $baseUrl ?: config('app.base_url', 'https://wenzhou.erponweb.com.mx');
            $url = "{$baseUrl}/index.php?entryPoint=SugarListExternalAccess&list={$list}";

            // Make API request
            $data = self::makeApiRequest($url);

            if ($removeEmpty) {
                $data = array_filter($data, static fn($item) => !empty($item));
            }

            // Cache the successful response
            if (!empty($data)) {
                Cache::put($cacheKey, $data, now()->addMinutes(self::CACHE_TTL));
                return $data;
            }

            Log::warning("Empty response from ERP API for list: {$list}");
            return [];
        } catch (\Exception $e) {
            Log::error("Error fetching ERP list '{$list}': {$e->getMessage()}");

            // Try to return stale cache data as fallback
            $staleData = Cache::get($cacheKey);
            if ($staleData !== null) {
                Log::info("Using stale cache data for ERP list: {$list}");
                return $staleData;
            }

            return [];
        }
    }

    /**
     * Clears cache for a specific list
     *
     * @param string $list List name
     * @return bool
     */
    public static function clearListCache(string $list): bool
    {
        $cacheKey = self::generateCacheKey($list);
        return Cache::forget($cacheKey);
    }

    /**
     * Clears all ERP list caches
     *
     * @return bool
     */
    public static function clearAllListCaches(): bool
    {
        // This will depend on your cache driver
        // For Redis/Memcached, you might want to use patterns
        // For file cache, this is a basic implementation
        try {
            $pattern = 'erp_list_*';

            // Note: This method works with Redis cache driver
            // For other drivers, you might need different approaches
            if (Cache::getStore() instanceof \Illuminate\Cache\RedisStore) {
                $keys = Cache::getRedis()->keys($pattern);
                foreach ($keys as $key) {
                    Cache::forget(str_replace(Cache::getPrefix(), '', $key));
                }
                return true;
            }

            // For other cache drivers, you'll need to track keys manually
            // or implement a different strategy
            return false;
        } catch (\Exception $e) {
            Log::error("Error clearing ERP list caches: {$e->getMessage()}");
            return false;
        }
    }
}
