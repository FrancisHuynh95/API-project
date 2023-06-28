import './socials.css'

const SocialsModal = () => {
    return (
        <>
        <div className="socials">
            <img className='software_engineer' src="/SoftwareEngineer.png"></img>
            <div className='whatItsMadeOutOf'>
                <h3>This website was made with:</h3>
                <p>JavaScript</p>
                <p>Node.js</p>
                <p>Express.js</p>
                <p>React.js/Redux</p>
                <p>PostgreSql</p>


            </div>
            <p className="aboutSocial">You can contact me through my social media</p>
            <div className="Socials-icon">
                <a className="linkedInContainer" target="_blank" href="https://www.linkedin.com/in/francis-huynh-153246161/">
                    <i className="linkedinIcon" class="fab fa-linkedin fa-lg"></i></a>
                <a className="githubContainer" target="_blank" href="https://github.com/FrancisHuynh95">
                    <i className='githubIcon' class="fab fa-github fa-lg"></i></a>
            </div>
        </div>
        </>
    )
}

export default SocialsModal
