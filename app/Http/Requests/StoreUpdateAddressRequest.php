<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'calle' => 'required|string|max:255',
            'noextenv' => 'required|string|max:50',
            'nointenvio' => 'nullable|string|max:50',
            'colenvio' => 'required|string|max:255',
            'ciudadenvio' => 'required|string|max:100',
            'estadoenvio' => 'required|string|max:100',
            'paisenvio' => 'required|string|max:100',
            'cpenvio' => 'required|string|max:20',
            'description' => 'nullable|string|max:500',
            'referencia_c' => 'nullable|string|max:500',
            'direccion_predeterminada_c' => 'boolean',
        ];
    }
}
