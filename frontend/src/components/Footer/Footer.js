import footerFavicon from "../../appLogo/footerFavicon.png"
import githubLogo from "./githubLogo.png"
import linkedinLogo from "./linkedinLogo.png"

const Footer = () => {
    return (
        <nav class="navbar fixed-bottom bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src={`${footerFavicon}`} /*alt="Logo"*/ width="30" height="24" class="d-inline-block align-text-top" />
                    Bartender Wingman
                    <p>Everyone in a bar should always have a wingman!</p>
                </a>
                <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '2%' }}>
                    <a href="https://github.com/Alainalvarez14/CocktailsCapstone"><img src={`${githubLogo}`} style={{ height: '3vh', margin: '0.4rem' }}></img></a>
                    <a href="https://www.linkedin.com/in/alain-alvarez-84400523a/"><img src={`${linkedinLogo}`} style={{ height: '3vh', margin: '0.4rem' }}></img></a>
                </div>
            </div>
        </nav>
        // <nav class="navbar fixed-bottom navbar-light bg-light">
        //     <a class="navbar-brand" href="#">Fixed bottom</a>
        // </nav>
    )
}

export default Footer;
