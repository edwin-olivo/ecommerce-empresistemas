import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FilterState {
    categories: string[];
    classes: string[];
    colors?: string[];
    priceRange: [number, number];
    orderBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
    pageSize?: '12' | '24' | '48' | 'all';
}

export interface Color {
    name: string;
    value: string;
}

export interface CheckboxOption {
    [key: string]: string;
}

export interface MultiSelectOption {
    label: string;
    value: string;
}

export interface Product {
    id: number;
    name: string;
    part_number: string;
    category: string;
    price: number;
    color: string;
    description?: string;
    custom?: { [key: string]: any } | null;
    [key: string]: any; // This allows for additional properties...
}

export interface PaginationLinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

export interface CartItem {
    id: string;
    cart_id: number;
    product_id: number;
    product: Record<string, any>;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface Wishlist {
    id: string;
    name: string;
    description?: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    products?: Product[];
    [key: string]: any; // This allows for additional properties...
}

export interface WishlistItem {
    id: string;
    wishlist_id: string;
    product_id: string;
    product?: Product | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface Address {
    id: string;
    user_id: number;
    name: string;
    recipient: string;
    phone: string;
    street_address: string;
    apartment?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    instructions?: string | null;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface DireccionEnvio {
    id: string;
    name: string;
    date_entered: string;
    date_modified: string;
    modified_user_id: string;
    created_by: string;
    description: string;
    deleted: string;
    assigned_user_id: string;
    account_id_c: string;
    contact_id_c: string;
    calle: string;
    noextenv: string;
    nointenvio: string;
    colenvio: string;
    ciudadenvio: string;
    estadoenvio: string;
    paisenvio: string;
    cpenvio: string;
    ubicaengoogle: string;
    paqueteria: string;
    custom?: DireccionEnvioCustom | null;
}

export interface DireccionEnvioCustom {
    id_c: string;
    cargo_c: string;
    departamento_c: string;
    email_c: string;
    teloficina_c: string;
    tipo_c: string;
    pv01_proveedores_id_c: string;
    referencia_c: string;
    direccion_predeterminada_c: string;
}

export type DireccionCompleta = DireccionEnvio & DireccionEnvioCustom;

export interface ImageSlider {
    id: string;
    name: string;
    title: string;
    description: string;
    cta: string;
    url_imagen: string;
}

export interface FAQ {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface EcommerceAdministration {
    id: string;
    name?: string | null;
    description?: string | null;
    historia_empresa?: string | null;
    mision_empresa?: string | null;
    vision_empresa?: string | null;
    icono_valor_empresa1?: string | null;
    icono_valor_empresa2?: string | null;
    icono_valor_empresa3?: string | null;
    icono_valor_empresa4?: string | null;
    valor_ecommerce1?: string | null;
    valor_ecommerce2?: string | null;
    valor_ecommerce3?: string | null;
    valor_ecommerce4?: string | null;
}

export interface AosInvoice {
    id: string;
    name?: string | null;
    date_entered?: string | null;
    date_modified?: string | null;
    modified_user_id?: string | null;
    created_by?: string | null;
    description?: string | null;
    deleted?: boolean | null;
    assigned_user_id?: string | null;
    billing_account_id?: string | null;
    billing_contact_id?: string | null;
    billing_address_street?: string | null;
    billing_address_city?: string | null;
    billing_address_state?: string | null;
    billing_address_postalcode?: string | null;
    billing_address_country?: string | null;
    shipping_address_street?: string | null;
    shipping_address_city?: string | null;
    shipping_address_state?: string | null;
    shipping_address_postalcode?: string | null;
    shipping_address_country?: string | null;
    number?: string | null;
    total_amt?: number | null;
    subtotal_amount?: number | null;
    discount_amount?: number | null;
    tax_amount?: number | null;
    shipping_amount?: number | null;
    total_amount?: number | null;
    currency_id?: string | null;
    quote_number?: number | null;
    quote_date?: string | null;
    invoice_date?: string | null;
    due_date?: string | null;
    status?: string | null;
    template_ddown_c?: string | null;
    subtotal_tax_amount?: number | null;
    custom?: AosInvoiceCustom | null;
}

export interface AosInvoiceCustom {
    id_c: string;
    sc01_subctas_id_c?: string | null;
    nombrectacontcta_c?: string | null;
    tipodemoneda_c?: string | null;
    almacendeventa_c?: string | null;
    fechacompentrega_c?: string | null;
    cancelar_c?: boolean | null;
    occliente_c?: string | null;
    lugardeentrega_c?: string | null;
    enviadaaflet_c?: boolean | null;
    estatus_pedido_c?: string | null;
    instanciaflete_c?: string | null;
    cfdi_c?: boolean | null;
    saldopendiente_c?: number | null;
    fechaliquidacion_c?: string | null;
    limitedecredito_c?: number | null;
    metodopago_c?: string | null;
    terminosdepago_c?: string | null;
    formadepago_c?: string | null;
    digitsctabanc_c?: string | null;
    vobocredito_c?: boolean | null;
    foliofactura_c?: number | null;
    cancelarbkp_c?: boolean | null;
    diasparapago_c?: number | null;
    comentsenfe_c?: string | null;
    user_id_c?: string | null;
    fechacreacioncta_c?: string | null;
    devolucionrel_c?: boolean | null;
    notadecreditoasig_c?: boolean | null;
    foliosi_c?: string | null;
    fechacfdi_c?: string | null;
    fechadepago2_c?: string | null;
    montoflete_c?: number | null;
    numservicioflete_c?: string | null;
    aos_invoices_id_c?: string | null;
    fechavencimpago_c?: string | null;
    industria_c?: string | null;
    user_id1_c?: string | null;
    aplica_flete_c?: string | null;
    tipo_flete_c?: string | null;
    rfc_c?: string | null;
    razonsocial_c?: string | null;
    refacturado_c?: boolean | null;
    subalmacen_c?: string | null;
    totalpzo1_c?: number | null;
    totalpzo2_c?: number | null;
    totalpzo3_c?: number | null;
    totalpzo4_c?: number | null;
    montodesc1_c?: number | null;
    montodesc2_c?: number | null;
    montodesc3_c?: number | null;
    montodesc4_c?: number | null;
    plazoaplic_c?: string | null;
    montoacobrar_c?: number | null;
    descaplicado_c?: number | null;
    periodopzo1_c?: string | null;
    periodopzo2_c?: string | null;
    periodopzo3_c?: string | null;
    periodopzo4_c?: string | null;
    fechap1_c?: string | null;
    fechap2_c?: string | null;
    fechap3_c?: string | null;
    fechap4_c?: string | null;
    fechap0_c?: string | null;
    tipo_c?: string | null;
    tipo2_c?: string | null;
    destino_c?: string | null;
    fechanotac_c?: string | null;
    numnotac_c?: number | null;
    tipodecambio_c?: number | null;
    soloservicio_c?: boolean | null;
    comisionliq_c?: boolean | null;
    cfdicancelado_c?: boolean | null;
    foliocobro_c?: string | null;
    fechacobro_c?: string | null;
    montocobro_c?: number | null;
    montonc_c?: number | null;
    fechafin_c?: string | null;
    totalpzofin_c?: number | null;
    conproceso_c?: string | null;
    enviadaairman_c?: boolean | null;
    nocompra_c?: string | null;
    prendas_c?: number | null;
    ac10_cfdi_id_c?: string | null;
    refacturado1_c?: boolean | null;
    tipo_relacion_c?: string | null;
    ac10_cfdi_id1_c?: string | null;
    uuid_relacionado_c?: string | null;
    totalpagar_c?: number | null;
    tipo_venta_c?: string | null;
    ecommerce_c?: number | null;
    ecommercebkp_c?: number | null;
    estatus_envio_c?: string | null;
    paqueteria_c?: string | null;
    guia_de_envio_c?: string | null;
    ob_cajas_id_c?: string | null;
    de02_direccsenvio_id_c?: string | null;
    venta_rapida_c?: boolean | null;
    user_id2_c?: string | null;
    fecha_cancelacion_c?: string | null;
    estatusvenc_c?: string | null;
    cwe_cuentaweberp_id_c?: string | null;
    af00_activofijo_id_c?: string | null;
    project_id_c?: string | null;
    aos_quotes_id_c?: string | null;
    complemento_c?: string | null;
    residencia_fiscal_c?: string | null;
    numero_identificacion_fiscal_c?: string | null;
    tipo_operacion_c?: string | null;
    certificado_origen_c?: string | null;
    exportador_confiable_c?: string | null;
    subdivision_c?: string | null;
    tipo_cambio_c?: number | null;
    clave_pedimento_c?: string | null;
    folio_certificado_c?: string | null;
    incoterm_c?: string | null;
    observaciones_aduana_c?: string | null;
    total_c?: string | null;
    motivo_traslado_c?: string | null;
    acc_apertura_cierre_caja_id_c?: string | null;
    cm_cajasmostrador_id_c?: string | null;
    tipo_concepto_c?: string | null;
    excedente_c?: number | null;
}

export type Venta = AosInvoice & AosInvoiceCustom;
