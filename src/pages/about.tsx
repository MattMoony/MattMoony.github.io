import style from './about.module.scss';
import React from 'react';
import MainHeader from '../components/MainHeader';
import BreadCrumbs from '../components/BreadCrumbs';
import { graphql } from 'gatsby';
import Footer from '../components/Footer';

import profilePic from '../images/me.jpg';
import pythonIQ from '../images/about/python-iq.png';
import javascriptIQ from '../images/about/javascript-iq.png';
import cssIQ from '../images/about/css-iq.png';
import html5IQ from '../images/about/html5-iq.png';

const About = ({ data, }) => {
    return (
        <>
            <MainHeader hideHeader>
                <div className={style.profile}>
                    <img src={profilePic} />
                    <h1>Matthias Monschein</h1>
                    <h6><span className={style.darker}>aka.</span> m4ttm00ny, MattMoony, M4ttM00ny, <span className={style.darker}>...</span></h6>
                </div>
                <hr />
                <h2>Technologies</h2>
                <p>
                    Some <a href="//www.pluralsight.com/product/skill-iq">Pluralsight skillIQ</a> tests I took some time ago. 
                    You will also find these in my <a href="//stackoverflow.com/users/story/9143069">StackOverflow developer story</a>.
                    I do hope that I have improved since the last time I did these, so I might retake them soon (whenever I find the spare time to do so ^^). 
                    You can actually also find some <i>Cisco</i> badges here ... :o
                </p>
                <div className={style.badges}>
                    <img src={pythonIQ} />
                    <img src={javascriptIQ} />
                    <img src={cssIQ} />
                    <img src={html5IQ} />
                    <a target="_blank" href="//www.credly.com/badges/336785cd-61c0-4083-a0fe-f8ac21c984ff/public_url"><img src="//images.credly.com/size/680x680/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/CyberEssentials.png" /></a>
                    <a target="_blank" href="//www.credly.com/badges/8c368bce-0f27-4dd7-b011-0635792e672c/public_url"><img src="//images.credly.com/size/680x680/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png" /></a>
                </div>
                <h2>Hacking</h2>
                <p>
                    Even though I'm currently not the most active on <a href="//hackthebox.eu">HackTheBox</a> I will try to do more
                    hacking over there in the near future. Furthermore, I'm a proud co-founder (^^) of the <a href="//ctftime.org/team/135809">B34nB01z</a>,
                    which a couple of classmates and I use to participate in some CTFs.
                </p>
                <div className={style.badges}>
                    <a target="_blank" href="//app.hackthebox.eu/users/256602"><img src="//www.hackthebox.eu/badge/image/256602" alt="Hack The Box"></img></a>
                    <a target="_blank" href="//eu.badgr.com/public/assertions/e2CkbeoKT-e38dPEwS_eew"><img src="//media.eu.badgr.com/uploads/badges/assertion-e2CkbeoKT-e38dPEwS_eew.png" /></a>
                    <a target="_blank" href="//badgr.com/public/assertions/tt-GN-6zRaS4fE4dYXfTCA?identity__email=m4ttm00ny@gmail.com"><img src="//media.badgr.com/uploads/badges/assertion-tt-GN-6zRaS4fE4dYXfTCA.png" /></a>
                </div>
                <h2><i>To be continued ... </i></h2>
            </MainHeader>
            <Footer />
        </>
    );
};

export default About;