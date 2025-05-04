import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Welcome to the Resource Sharing Platform</h1>
                <p>Share and discover academic resources with your peers!</p>
                <div className="cta-buttons">
                    <Link to="/upload" className="btn primary">Upload Resource</Link>
                    <Link to="/search" className="btn secondary">Search Resources</Link>
                </div>
            </header>
            <section className="features">
                <div className="feature">
                    <h3>Share Notes</h3>
                    <p>Upload study guides, notes, or practice problems.</p>
                </div>
                <div className="feature">
                    <h3>Collaborate</h3>
                    <p>Comment and discuss resources with classmates.</p>
                </div>
                <div className="feature">
                    <h3>Organize</h3>
                    <p>Tag resources by subject for easy access.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;