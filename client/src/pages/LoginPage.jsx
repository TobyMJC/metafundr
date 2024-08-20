function LoginPage() {
    return (<div className='login-page'>
        <form className='login-form'>
           <h1>MetaFundr</h1>
           <input type='email' required={true} className='login-email' placeholder='Correo Electronico'/>
           <input type='password' required={true} minLength={6} className='login-password' placeholder='Contraseña'/>
           <input type='submit' className='login-button'/> 
        </form>
    </div>) 
}

export default LoginPage;