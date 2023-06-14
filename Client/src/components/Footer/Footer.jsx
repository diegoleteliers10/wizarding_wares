import React from "react";


const Footer = () => {
    return (
        <div>
            <div>
                <div>
                    Aca va el logo
                </div>
                <div>
                    <h4>Información</h4>
                    <a href="/nosotros"/>
                    <p>Nosotros</p>
                    <a href="/faq"/>
                    <p>FAQ</p>
                </div>
                <div>
                <h4>Legal</h4>
                    <a href="/terminosYCondiciones"/>
                    <p>Términos y Condiciones</p>
                    <a href="/politicaDePrivacidad"/>
                    <p>Política de Privacidad</p>
                </div>
            </div>
            <div>
               <p>2023 - Wizarding Wares | All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;