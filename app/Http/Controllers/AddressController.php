<?php

namespace App\Http\Controllers;

use App\Helpers\ListHelper;
use App\Http\Requests\StoreUpdateAddressRequest;
use App\Models\De02Direccsenvio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddressController extends Controller
{
    /**
     * Muestre una lista de las direcciones del usuario autenticado.
     */
    public function index(Request $request)
    {
        $addresses = De02Direccsenvio::with('custom')
            ->where('account_id_c', auth()->id())
            ->where('deleted', 0)
            ->orderBy('date_entered', 'desc')
            ->get();

        return Inertia::render('dashboard/addresses', [
            'addresses' => $addresses,
            'paqueterias' => ListHelper::getERPList('paqueteria_list'),
            'entidades_federativas' => ListHelper::getERPList('entidadfederativa_list'),
            'paises' => ListHelper::getERPList('pais_list'),
        ]);
    }

    /**
     * Almacena una nueva dirección
     */
    public function store(StoreUpdateAddressRequest $request)
    {
        $validated = $request->validated();
        $validated['account_id_c'] = auth()->id();
        $validated['date_entered'] = now();
        $validated['date_modified'] = now();

        $address = De02Direccsenvio::create($validated);

        if ($validated['direccion_predeterminada_c'] ?? false) {
            $address->markAsDefault();
        }

        return redirect()->back()->with('success', 'Dirección creada exitosamente');
    }

    /**
     * Muestra la dirección especificada.
     */
    public function show(De02Direccsenvio $address)
    {
        return Inertia::render('dashboard/addresses/Show', [
            'address' => $address::with('custom')->find($address->id),
            'paqueterias' => ListHelper::getERPList('paqueteria_list'),
            'entidades_federativas' => ListHelper::getERPList('entidadfederativa_list'),
            'paises' => ListHelper::getERPList('pais_list'),
        ]);
    }

    /**
     * Actualiza la dirección especificada
     */
    public function update(StoreUpdateAddressRequest $request, De02Direccsenvio $address)
    {
        $validated = $request->validated();
        $validated['date_modified'] = now();
        $address->update($validated);

        if ($validated['direccion_predeterminada_c'] ?? false) {
            $address->markAsDefault();
        }

        return redirect()->back()->with('success', 'Dirección actualizada exitosamente');
    }

    /**
     * Elimina la dirección especificada.
     */
    public function destroy(De02Direccsenvio $address)
    {
        $address->deleted = 1;
        $address->save();

        return redirect()->back()->with('success', 'Dirección eliminada exitosamente');
    }

    /**
     * Establece la dirección especificada como la dirección predeterminada para el usuario.
     */
    public function setDefault(De02Direccsenvio $address)
    {
        $address->markAsDefault();

        return redirect()->back()->with('success', 'Dirección establecida como predeterminada');
    }
}
