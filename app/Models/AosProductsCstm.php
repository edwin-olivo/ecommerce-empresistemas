<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AosProductsCstm
 * 
 * @property string $id_c
 * @property string|null $tipodemoneda_c
 * @property float|null $pa1_c
 * @property float|null $pa2_c
 * @property float|null $pa3_c
 * @property float|null $pa4_c
 * @property float|null $pa5_c
 * @property string|null $clase_c
 * @property string|null $unidad_c
 * @property string|null $codbar_c
 * @property float|null $volumen_c
 * @property string|null $nombreingles_c
 * @property bool|null $bloqueado_c
 * @property string|null $estatus_c
 * @property bool|null $imagenasignada_c
 * @property string|null $nombre_imagen_c
 * @property float|null $pa6_c
 * @property float|null $pa7_c
 * @property string|null $enportal_c
 * @property string|null $clavesat_c
 * @property string|null $claveunidadsat_c
 * @property string|null $nombre_imagen2_c
 * @property string|null $nombre_imagen3_c
 * @property string|null $nombre_imagen4_c
 * @property string|null $nombre_imagen5_c
 * @property string|null $nombre_imagen6_c
 * @property string|null $nombre_imagen7_c
 * @property string|null $nombre_imagen8_c
 * @property string|null $nombre_imagen9_c
 * @property string|null $nombre_imagen10_c
 * @property string|null $tasa_iva_c
 * @property bool|null $descripcion_alterna_c
 * @property float|null $precio_mayoreo_c
 * @property bool|null $granel_c
 * @property string|null $prioridad_c
 * @property bool|null $descuento_mayoreo_c
 * @property float|null $cantidad_descuento_c
 * @property float|null $porcentaje_descuento_c
 * @property string|null $pv01_proveedores_id_c
 * @property float|null $precio_promo_c
 * @property Carbon|null $start_date_c
 * @property Carbon|null $end_date_c
 * @property bool|null $ecommmerce_new_c
 * @property bool|null $ecommerce_recommended_c
 * @property bool|null $ecommerce_more_sales_c
 * @property string|null $reglas_precios_c
 * @property string|null $marca_c
 * @property string|null $desplegable_etiqueta_c
 * @property float|null $costo_promedio_c
 * @property bool|null $con_lote_c
 * @property bool|null $con_pedimento_c
 * @property float|null $peso_c
 *
 * @package App\Models
 */
class AosProductsCstm extends Model
{
	protected $table = 'aos_products_cstm';
	protected $primaryKey = 'id_c';
	protected $appends = ['url_imagen'];
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'pa1_c' => 'float',
		'pa2_c' => 'float',
		'pa3_c' => 'float',
		'pa4_c' => 'float',
		'pa5_c' => 'float',
		'volumen_c' => 'float',
		'bloqueado_c' => 'bool',
		'imagenasignada_c' => 'bool',
		'pa6_c' => 'float',
		'pa7_c' => 'float',
		'descripcion_alterna_c' => 'bool',
		'precio_mayoreo_c' => 'float',
		'granel_c' => 'bool',
		'descuento_mayoreo_c' => 'bool',
		'cantidad_descuento_c' => 'float',
		'porcentaje_descuento_c' => 'float',
		'precio_promo_c' => 'float',
		'start_date_c' => 'datetime',
		'end_date_c' => 'datetime',
		'ecommmerce_new_c' => 'bool',
		'ecommerce_recommended_c' => 'bool',
		'ecommerce_more_sales_c' => 'bool',
		'costo_promedio_c' => 'float',
		'con_lote_c' => 'bool',
		'con_pedimento_c' => 'bool',
		'peso_c' => 'float'
	];

	protected $fillable = [
		'tipodemoneda_c',
		'pa1_c',
		'pa2_c',
		'pa3_c',
		'pa4_c',
		'pa5_c',
		'clase_c',
		'unidad_c',
		'codbar_c',
		'volumen_c',
		'nombreingles_c',
		'bloqueado_c',
		'estatus_c',
		'imagenasignada_c',
		'nombre_imagen_c',
		'pa6_c',
		'pa7_c',
		'enportal_c',
		'clavesat_c',
		'claveunidadsat_c',
		'nombre_imagen2_c',
		'nombre_imagen3_c',
		'nombre_imagen4_c',
		'nombre_imagen5_c',
		'nombre_imagen6_c',
		'nombre_imagen7_c',
		'nombre_imagen8_c',
		'nombre_imagen9_c',
		'nombre_imagen10_c',
		'tasa_iva_c',
		'descripcion_alterna_c',
		'precio_mayoreo_c',
		'granel_c',
		'prioridad_c',
		'descuento_mayoreo_c',
		'cantidad_descuento_c',
		'porcentaje_descuento_c',
		'pv01_proveedores_id_c',
		'precio_promo_c',
		'start_date_c',
		'end_date_c',
		'ecommmerce_new_c',
		'ecommerce_recommended_c',
		'ecommerce_more_sales_c',
		'reglas_precios_c',
		'marca_c',
		'desplegable_etiqueta_c',
		'costo_promedio_c',
		'con_lote_c',
		'con_pedimento_c',
		'peso_c'
	];

	public function product()
	{
		return $this->belongsTo(AosProducts::class, 'id_c', 'id');
	}

	public function getUrlImagenAttribute()
	{
		return $this->nombre_imagen_c ? config('app.base_url') . '/customcode/redim.php?&ancho=300&alto=300&img=imagenes/' . $this->nombre_imagen_c : null;
	}
}
