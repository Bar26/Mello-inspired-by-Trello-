
export function AppHeader() {
    return <header className="main-header flex space-between">
        <h1 className="logo">Trello</h1>
        <section className="nav-header flex">
            <button className="login">Log in</button>
            <button className="signup">Sign up</button>
        </section>
    </header>
}