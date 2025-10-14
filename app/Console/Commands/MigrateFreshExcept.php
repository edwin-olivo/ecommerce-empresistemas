<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;

class MigrateFreshExcept extends Command
{
    protected $signature = 'migrate:fresh-except';

    protected $description = 'Run migrate:fresh but keep specific tables intact';

    // Aquí defines las tablas que NO quieres eliminar
    protected $except = [
        'aos_products',
        'aos_products_cstm',
    ];

    public function handle()
    {
        $this->info('Dropping all tables except: ' . implode(', ', $this->except));

        $tables = collect(DB::select('SHOW TABLES'))->map(function ($row) {
            return array_values((array)$row)[0];
        })->toArray();

        foreach ($tables as $table) {
            if (!in_array($table, $this->except)) {
                Schema::disableForeignKeyConstraints();
                Schema::drop($table);
                Schema::enableForeignKeyConstraints();
                $this->line("Dropped table: $table");
            } else {
                $this->line("Skipped table: $table");
            }
        }

        $this->info('Running migrations...');
        Artisan::call('migrate', [], $this->getOutput());
    }
}
