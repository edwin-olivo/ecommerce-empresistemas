<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateAddressRequest;
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
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/addresses', [
            'addresses' => $addresses,
        ]);
    }

    /**
     * Almacena una nueva dirección
     */
    public function store(StoreUpdateAddressRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $address = Address::create($validated);

        return redirect()->back()->with('success', 'Dirección creada exitosamente');
    }

    /**
     * Muestra la dirección especificada.
     */
    public function show(Address $address)
    {
        return Inertia::render('dashboard/addresses/Show', [
            'address' => $address,
        ]);
    }

    /**
     * Actualiza la dirección especificada
     */
    public function update(StoreUpdateAddressRequest $request, Address $address)
    {
        $validated = $request->validated();
        $address->update($validated);

        return redirect()->back()->with('success', 'Dirección actualizada exitosamente');
    }

    /**
     * Elimina la dirección especificada.
     */
    public function destroy(Address $address)
    {
        $address->delete();
        return redirect()->back()->with('success', 'Dirección eliminada exitosamente');
    }

    /**
     * Establece la dirección especificada como la dirección predeterminada para el usuario.
     */
    public function setDefault(Address $address)
    {
        $address->update(['is_default' => true]);

        return redirect()->back()->with('success', 'Dirección establecida como predeterminada');
    }
}
