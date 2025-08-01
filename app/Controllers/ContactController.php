<?php
/**
 * Controlador para gestión del carrito de compras
 */

class ContactController extends Controller {
    
    /**
     * Página con información de contacto
     */
    public function index() {
        try {
            //
            $contactService = new ContactService();
            $contactInfo = $contactService->getAll();

            foreach ($contactInfo as &$info) {
                // Asegurarse de que los campos estén definidos
                if (isset($info['telcontacto'])) {
                    $tel = preg_replace('/\D/', '', $info['telcontacto']);
                    if (strlen($tel) === 10) {
                        $info['telcontacto'] = sprintf('+52 (%s) %s-%s',
                            substr($tel, 0, 3),
                            substr($tel, 3, 3),
                            substr($tel, 6, 4)
                        );
                    } else {
                        $info['telcontacto'] = $tel;
                    }
                }
            }
            
            $data = [
                'title' => 'Contacto - ' . APP_NAME,
                'contactInfo' => $contactInfo,
                'pageClass' => 'contact-page'
            ];
            
            $this->view('contact/index', $data);
            
        } catch (Exception $e) {
            error_log("Error en ContactController::index: " . $e->getMessage());
            $this->view('errors/500', ['error' => $e->getMessage()]);
        }
    }
}
