import RegistrationForm from "./registration/RegistrationForm"
import LoginForm from "./login/LoginForm"
import Navbar from "./common/Navbar"
import NavbarPartner from "./common/NavbarPartner"
import DashboardClient from "./client/DashboardClient"
import DashboardPartner from "./partner/DashboardPartner"
import ErrorMessage from "./common/ErrorMessage"

export const showError = () => {
    document.querySelector('#submit_btn').disabled = true
    setTimeout(() => document.querySelector('#submit_btn').disabled = false, 5000)
}

export {
    RegistrationForm,
    LoginForm,
    Navbar,
    NavbarPartner,
    DashboardClient,
    DashboardPartner,
    ErrorMessage,
}