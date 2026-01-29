<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AosInvoicesCstm
 *
 * @property string $id_c
 * @property string|null $sc01_subctas_id_c
 * @property string|null $nombrectacontcta_c
 * @property string|null $tipodemoneda_c
 * @property string|null $almacendeventa_c
 * @property Carbon|null $fechacompentrega_c
 * @property bool|null $cancelar_c
 * @property string|null $occliente_c
 * @property string|null $lugardeentrega_c
 * @property bool|null $enviadaaflet_c
 * @property string|null $estatus_pedido_c
 * @property string|null $instanciaflete_c
 * @property bool|null $cfdi_c
 * @property float|null $saldopendiente_c
 * @property Carbon|null $fechaliquidacion_c
 * @property float|null $limitedecredito_c
 * @property string|null $metodopago_c
 * @property string|null $terminosdepago_c
 * @property string|null $formadepago_c
 * @property string|null $digitsctabanc_c
 * @property bool|null $vobocredito_c
 * @property int|null $foliofactura_c
 * @property bool|null $cancelarbkp_c
 * @property int|null $diasparapago_c
 * @property string|null $comentsenfe_c
 * @property string|null $user_id_c
 * @property Carbon|null $fechacreacioncta_c
 * @property bool|null $devolucionrel_c
 * @property bool|null $notadecreditoasig_c
 * @property string|null $foliosi_c
 * @property Carbon|null $fechacfdi_c
 * @property Carbon|null $fechadepago2_c
 * @property float|null $montoflete_c
 * @property string|null $numservicioflete_c
 * @property string|null $aos_invoices_id_c
 * @property Carbon|null $fechavencimpago_c
 * @property string|null $industria_c
 * @property string|null $user_id1_c
 * @property string|null $aplica_flete_c
 * @property string|null $tipo_flete_c
 * @property string|null $rfc_c
 * @property string|null $razonsocial_c
 * @property bool|null $refacturado_c
 * @property string|null $subalmacen_c
 * @property float|null $totalpzo1_c
 * @property float|null $totalpzo2_c
 * @property float|null $totalpzo3_c
 * @property float|null $totalpzo4_c
 * @property float|null $montodesc1_c
 * @property float|null $montodesc2_c
 * @property float|null $montodesc3_c
 * @property float|null $montodesc4_c
 * @property string|null $plazoaplic_c
 * @property float|null $montoacobrar_c
 * @property float|null $descaplicado_c
 * @property string|null $periodopzo1_c
 * @property string|null $periodopzo2_c
 * @property string|null $periodopzo3_c
 * @property string|null $periodopzo4_c
 * @property string|null $fechap1_c
 * @property string|null $fechap2_c
 * @property string|null $fechap3_c
 * @property string|null $fechap4_c
 * @property string|null $fechap0_c
 * @property string|null $tipo_c
 * @property string|null $tipo2_c
 * @property string|null $destino_c
 * @property Carbon|null $fechanotac_c
 * @property int|null $numnotac_c
 * @property float|null $tipodecambio_c
 * @property bool|null $soloservicio_c
 * @property bool|null $comisionliq_c
 * @property bool|null $cfdicancelado_c
 * @property string|null $foliocobro_c
 * @property Carbon|null $fechacobro_c
 * @property float|null $montocobro_c
 * @property float|null $montonc_c
 * @property string|null $fechafin_c
 * @property float|null $totalpzofin_c
 * @property string|null $conproceso_c
 * @property bool|null $enviadaairman_c
 * @property string|null $nocompra_c
 * @property float|null $prendas_c
 * @property string|null $ac10_cfdi_id_c
 * @property bool|null $refacturado1_c
 * @property string|null $tipo_relacion_c
 * @property string|null $ac10_cfdi_id1_c
 * @property string|null $uuid_relacionado_c
 * @property float|null $totalpagar_c
 * @property string|null $tipo_venta_c
 * @property int|null $ecommerce_c
 * @property int|null $ecommercebkp_c
 * @property string|null $estatus_envio_c
 * @property string|null $paqueteria_c
 * @property string|null $guia_de_envio_c
 * @property string|null $ob_cajas_id_c
 * @property string|null $de02_direccsenvio_id_c
 * @property bool|null $venta_rapida_c
 * @property string|null $user_id2_c
 * @property Carbon|null $fecha_cancelacion_c
 * @property string|null $estatusvenc_c
 * @property string|null $cwe_cuentaweberp_id_c
 * @property string|null $af00_activofijo_id_c
 * @property string|null $project_id_c
 * @property string|null $aos_quotes_id_c
 * @property string|null $complemento_c
 * @property string|null $residencia_fiscal_c
 * @property string|null $numero_identificacion_fiscal_c
 * @property string|null $tipo_operacion_c
 * @property string|null $certificado_origen_c
 * @property string|null $exportador_confiable_c
 * @property string|null $subdivision_c
 * @property float|null $tipo_cambio_c
 * @property string|null $clave_pedimento_c
 * @property string|null $folio_certificado_c
 * @property string|null $incoterm_c
 * @property string|null $observaciones_aduana_c
 * @property string|null $total_c
 * @property string|null $motivo_traslado_c
 * @property string|null $acc_apertura_cierre_caja_id_c
 * @property string|null $cm_cajasmostrador_id_c
 * @property string|null $tipo_concepto_c
 * @property float|null $excedente_c
 *
 * @package App\Models
 */
class AosInvoicesCstm extends Model
{
    protected $table = 'aos_invoices_cstm';
    protected $primaryKey = 'id_c';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'fechacompentrega_c' => 'datetime',
        'cancelar_c' => 'bool',
        'enviadaaflet_c' => 'bool',
        'cfdi_c' => 'bool',
        'saldopendiente_c' => 'float',
        'fechaliquidacion_c' => 'datetime',
        'limitedecredito_c' => 'float',
        'vobocredito_c' => 'bool',
        'foliofactura_c' => 'int',
        'cancelarbkp_c' => 'bool',
        'diasparapago_c' => 'int',
        'fechacreacioncta_c' => 'datetime',
        'devolucionrel_c' => 'bool',
        'notadecreditoasig_c' => 'bool',
        'fechacfdi_c' => 'datetime',
        'fechadepago2_c' => 'datetime',
        'montoflete_c' => 'float',
        'fechavencimpago_c' => 'datetime',
        'refacturado_c' => 'bool',
        'totalpzo1_c' => 'float',
        'totalpzo2_c' => 'float',
        'totalpzo3_c' => 'float',
        'totalpzo4_c' => 'float',
        'montodesc1_c' => 'float',
        'montodesc2_c' => 'float',
        'montodesc3_c' => 'float',
        'montodesc4_c' => 'float',
        'montoacobrar_c' => 'float',
        'descaplicado_c' => 'float',
        'fechanotac_c' => 'datetime',
        'numnotac_c' => 'int',
        'tipodecambio_c' => 'float',
        'soloservicio_c' => 'bool',
        'comisionliq_c' => 'bool',
        'cfdicancelado_c' => 'bool',
        'fechacobro_c' => 'datetime',
        'montocobro_c' => 'float',
        'montonc_c' => 'float',
        'totalpzofin_c' => 'float',
        'enviadaairman_c' => 'bool',
        'prendas_c' => 'float',
        'refacturado1_c' => 'bool',
        'totalpagar_c' => 'float',
        'ecommerce_c' => 'int',
        'ecommercebkp_c' => 'int',
        'venta_rapida_c' => 'bool',
        'fecha_cancelacion_c' => 'datetime',
        'tipo_cambio_c' => 'float',
        'excedente_c' => 'float',
    ];

    protected $fillable = [
        'sc01_subctas_id_c',
        'nombrectacontcta_c',
        'tipodemoneda_c',
        'almacendeventa_c',
        'fechacompentrega_c',
        'cancelar_c',
        'occliente_c',
        'lugardeentrega_c',
        'enviadaaflet_c',
        'estatus_pedido_c',
        'instanciaflete_c',
        'cfdi_c',
        'saldopendiente_c',
        'fechaliquidacion_c',
        'limitedecredito_c',
        'metodopago_c',
        'terminosdepago_c',
        'formadepago_c',
        'digitsctabanc_c',
        'vobocredito_c',
        'foliofactura_c',
        'cancelarbkp_c',
        'diasparapago_c',
        'comentsenfe_c',
        'user_id_c',
        'fechacreacioncta_c',
        'devolucionrel_c',
        'notadecreditoasig_c',
        'foliosi_c',
        'fechacfdi_c',
        'fechadepago2_c',
        'montoflete_c',
        'numservicioflete_c',
        'aos_invoices_id_c',
        'fechavencimpago_c',
        'industria_c',
        'user_id1_c',
        'aplica_flete_c',
        'tipo_flete_c',
        'rfc_c',
        'razonsocial_c',
        'refacturado_c',
        'subalmacen_c',
        'totalpzo1_c',
        'totalpzo2_c',
        'totalpzo3_c',
        'totalpzo4_c',
        'montodesc1_c',
        'montodesc2_c',
        'montodesc3_c',
        'montodesc4_c',
        'plazoaplic_c',
        'montoacobrar_c',
        'descaplicado_c',
        'periodopzo1_c',
        'periodopzo2_c',
        'periodopzo3_c',
        'periodopzo4_c',
        'fechap1_c',
        'fechap2_c',
        'fechap3_c',
        'fechap4_c',
        'fechap0_c',
        'tipo_c',
        'tipo2_c',
        'destino_c',
        'fechanotac_c',
        'numnotac_c',
        'tipodecambio_c',
        'soloservicio_c',
        'comisionliq_c',
        'cfdicancelado_c',
        'foliocobro_c',
        'fechacobro_c',
        'montocobro_c',
        'montonc_c',
        'fechafin_c',
        'totalpzofin_c',
        'conproceso_c',
        'enviadaairman_c',
        'nocompra_c',
        'prendas_c',
        'ac10_cfdi_id_c',
        'refacturado1_c',
        'tipo_relacion_c',
        'ac10_cfdi_id1_c',
        'uuid_relacionado_c',
        'totalpagar_c',
        'tipo_venta_c',
        'ecommerce_c',
        'ecommercebkp_c',
        'estatus_envio_c',
        'paqueteria_c',
        'guia_de_envio_c',
        'ob_cajas_id_c',
        'de02_direccsenvio_id_c',
        'venta_rapida_c',
        'user_id2_c',
        'fecha_cancelacion_c',
        'estatusvenc_c',
        'cwe_cuentaweberp_id_c',
        'af00_activofijo_id_c',
        'project_id_c',
        'aos_quotes_id_c',
        'complemento_c',
        'residencia_fiscal_c',
        'numero_identificacion_fiscal_c',
        'tipo_operacion_c',
        'certificado_origen_c',
        'exportador_confiable_c',
        'subdivision_c',
        'tipo_cambio_c',
        'clave_pedimento_c',
        'folio_certificado_c',
        'incoterm_c',
        'observaciones_aduana_c',
        'total_c',
        'motivo_traslado_c',
        'acc_apertura_cierre_caja_id_c',
        'cm_cajasmostrador_id_c',
        'tipo_concepto_c',
        'excedente_c',
    ];
}
