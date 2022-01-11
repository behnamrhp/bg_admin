import './style.css';
import background from './../../assets/images/login.jpg';
import { LoginForm } from "./form";


export function Login() {
   

    return (
        <div className="theme-cyan authentication sidebar-collapse">
                <div className="page-header">
                <div className="page-header-image" style={{ backgroundImage : `url(${background})`}}></div>

                <div className="container">
                    <div className="col-md-12 content-center">
                        <div className="card-plain">

                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}