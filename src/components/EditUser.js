import React from 'react';
import NavigationMenu from './NavigationMenu';
import "../css/editUser.css";

const EditUser = () => {
    return (
        <div className="edituser">
            <NavigationMenu />

            <div className="page_container">
                <div className="container_content_menu">
                    <div className="menu_edit">
                        <ul>
                            <li>
                                Criar Novo Usuário
                            </li>
                            <li>
                                Editar seus dados
                            </li>
                        </ul>
                    </div>

                    <div className="content">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
