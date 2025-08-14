import React from 'react';

const Contribute = () => {
    return (
        <section id="contribute" className="contribute">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Contribute to YAAP</h2>
                    <p className="section-subtitle">Help us make YAAP better for everyone</p>
                </div>

                <div className="contribute__content">
                    <div className="contribute-ways">
                        <div className="contribute-card">
                            <h3 className="contribute-card__title">👨‍💻 Development</h3>
                            <p className="contribute-card__description">Submit patches, fix bugs or help improve our things further</p>
                        </div>

                        <div className="contribute-card">
                            <h3 className="contribute-card__title">🧪 Testing</h3>
                            <p className="contribute-card__description">Test builds on your device and report issues to help us improve stability</p>
                        </div>

                        <div className="contribute-card">
                            <h3 className="contribute-card__title">📱 Translate</h3>
                            <p className="contribute-card__description">Help translate YAAP to your native language</p>
                        </div>

                        <div className="contribute-card">
                            <a href="https://github.com/sponsors/yaap" target="_blank" rel="noopener noreferrer">
                                <h3 className="contribute-card__title">💵 Donate</h3>
                                <p className="contribute-card__description">We do not require nor ask for it. Only do if you feel like it</p>
                            </a>
                        </div>
                    </div>

                    <div className="contribute-cta">
                        <h3>Ready to contribute?</h3>
                        <p>Visit our GitHub organization to get started</p>
                        <a href="https://github.com/YAAP" target="_blank" className="btn btn--primary btn--lg">Start Contributing</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contribute;
