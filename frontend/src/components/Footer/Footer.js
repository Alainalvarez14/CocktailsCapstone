import footerFavicon from "../../appLogo/footerFavicon.png"
import githubLogo from "./githubLogo.png"
import linkedinLogo from "./linkedinLogo.png"
import angelList from "./angelList.svg"

const Footer = () => {
    return (
        <nav class="navbar fixed-bottom bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" style={{ marginLeft: '2vw', cursor: 'default' }}>
                    <div style={{ display: 'flex' }}>
                        <img src={`${footerFavicon}`} /*alt="Logo"*/ width="30" height="24" class="d-inline-block align-text-top" />
                        <p style={{ marginLeft: '0.5vw', color: 'rgb(13, 110, 253)', fontWeight: '320' }}>Bartender Wingman</p>
                    </div>
                    <div style={{ marginTop: '-1vh', fontWeight: '320' }}>Everyone in a bar should always have a wingman!</div>
                </a>
                <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '2%' }}>
                    <a href="https://angel.co/u/alain-alvarez-1"><img src={`${angelList}`} style={{ height: '3vh', marginBottom: '0.4rem', marginTop: '0.4rem' }}></img></a>
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
