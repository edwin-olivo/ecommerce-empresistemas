<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    /**
     * Muestre una lista de las direcciones del usuario autenticado.
     */
    public function index(Request $request)
    {
        $addresses = Address::where('user_id', auth()->id())
            ->orderBy('is_default', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/addresses', [
            'addresses' => $addresses,
        ]);
    }

    /**
     * Almacena una nueva dirección
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'recipient' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'street_address' => 'required|string|max:255',
            'apartment' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'instructions' => 'nullable|string|max:500',
            'is_default' => 'boolean',
        ]);

        $validated['user_id'] = auth()->id();

        $address = Address::create($validated);

        return response()->json([
            'message' => 'Dirección creada exitosamente',
            'address' => $address,
        ], 201);
    }

    /**
     * Muestra la dirección especificada.
     */
    public function show(Address $address)
    {
        return response()->json($address);
    }

    /**
     * Actualiza la dirección especificada
     */
    public function update(Request $request, Address $address)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'recipient' => 'string|max:255',
            'phone' => 'string|max:20',
            'street_address' => 'string|max:255',
            'apartment' => 'nullable|string|max:255',
            'city' => 'string|max:100',
            'state' => 'string|max:100',
            'postal_code' => 'string|max:20',
            'country' => 'string|max:100',
            'instructions' => 'nullable|string|max:500',
            'is_default' => 'boolean',
        ]);

        $address->update($validated);

        return response()->json([
            'message' => 'Dirección actualizada exitosamente',
            'address' => $address,
        ]);
    }

    /**
     * Elimina la dirección especificada.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json(['message' => 'Dirección eliminada exitosamente']);
    }

    /**
     * Establece la dirección especificada como la dirección predeterminada para el usuario.
     */
    public function setDefault(Address $address)
    {
        $address->update(['is_default' => true]);

        return response()->json([
            'message' => 'Dirección establecida como predeterminada',
            'address' => $address,
        ]);
    }
}
