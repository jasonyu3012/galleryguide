import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CardGroup from 'react-bootstrap/CardGroup';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tara_img from '../images/tara_headshot.png';
import jason_img from '../images/jason_headshot.jpg';
import jerry_img from '../images/jerry-headshot.jpg';
import landon_img from '../images/landon_headshot.jpg';
import sunad_img from '../images/sunad_headshot.jpg';

const team = [
    {
        name: "Tara Sophia Roshan",
        gitlab_username: "troshan",
        role: "Frontend",
        bio: "I'm a junior CS major (I transferred internally from Math after freshman year)! I still really love math; I'm part of the Association for Women in Math at UT (look us up!) and it's basically my entire friend group. I love AWM.",
        tests: 0,
        email: "troshan@utexas.edu",
        image: tara_img
    },
    {
        name: "Jason Yu",
        gitlab_username: "jasonyu3012",
        role: "Backend",
        bio: "I am currently a student at the University of Texas pursuing a major in computer science with a minor in business. Outside of code, I love photography, digital media creation, art, design, and following new technology. I also hate Leetcode and dynamically typed programming languages.",
        tests: 0,
        email: "jasonyu3012@gmail.com",
        image: jason_img
    },
    {
        name: "Jerry Ming",
        gitlab_username: "jerryming2002",
        role: "Frontend",
        bio: "I'm a second year CS major at the university of texas at austin. Outside of school, I pursue cooking, baking, and other culinary arts. I also enjoy building computers and playing video games. My favorite cookie is lemon sugar.",
        tests: 0,
        email: "jerryming2002@gmail.com",
        image: jerry_img
    },
    {
        name: "Landon Johnson",
        gitlab_username: "LandonDude",
        role: "Backend",
        bio: "I am a senior CS student at the University of Texas at Austin graduating in Fall '23. When I am not doing class work, I participate in the Longhorn Band where I play tuba. If the stakes are high enough, I have been known to solve Leetcode mediums.",
        tests: 0,
        email: "landon@cs.utexas.edu",
        image: landon_img
    },
    {
        name: "Sunad Adhikari",
        gitlab_username: "sunadadhikari",
        role: "Backend",
        bio: "I am a 2nd year CS student at the University of Texas at Austin from Dallas, Texas. I enjoy watching diffrent Dallas based sports teams like the Cowboys, Mavericks and Rangers along with Forumla 1. Which one I like most depends which is on TV at the time. The rest of my free time is spent watching TV shows, I am all for any thing sci-fi and mystery.",
        tests: 0,
        email: "sunadadhikari@gmail.com",
        image: sunad_img
    },
]

const tools = [
    {
        name: "React",
        description: "JavaScript framework for frontend development",
        // image: "./toolsPic/react-logo.png",
        link: "https://reactjs.org"
    },
    {
        name: "GitLab",
        description: "Storing code and running CI/CD",
        // image: "./toolsPic/gitlab-logo.png",
        link: "https://gitlab.com"
    },
    {
        name: "React Bootstrap",
        description: "CSS framework",
        // image: "./toolsPic/react-bootstrap-logo.png",
        link: "https://react-bootstrap.github.io/"
    },
    {
        name: "Postman",
        description: "For designing, testing, and documenting APIs",
        // image: "./toolsPic/postman-logo.png",
        link: "https://www.postman.com/"
    },
    {
        name: "Namecheap",
        description: "Domain name provider",
        // image: "./toolsPic/namecheap-logo.png",
        link: "https://www.namecheap.com/"
    },
]

const sources = [
    {
        name: "MET Museum API",
        description: "API used for gathering artwork data",
        // image: "./toolsPic/yelpLogo.png",
        link: "https://metmuseum.github.io/"
    },
    {
        name: "Art Institute of Chicago Public API",
        description: "API used for gathering artist data",
        // image: "./toolsPic/wgerLogo.png",
        link: "https://www.artic.edu/open-access/public-api"     
    },
    {
        name: "Artsy API",
        description: "API used for gathering gallery data",
        // image: "./toolsPic/wgerLogo.png",
        link: "https://developers.artsy.net/v2/docs/partners"     
    },
]

const names =   {"Tara Sophia Roshan": 0,
                "Jason Yu": 1,
                "Jerry Ming": 2, 
                "Landon Johnson": 3, 
                "Sunad Adhikari": 4};

const projectID = '43453197';

const client = axios.create({
    baseURL: 'https://gitlab.com/api/v4/projects/43453197',
  });

  
export default function About() {
    // Code credit to IDB Group 3, WorkItOut, and GeoJobs

    const [commitsState, updateCommits] = useState([0, 0, 0, 0, 0]);
    const [issuesState, updateIssues] = useState([0, 0, 0, 0, 0]);
    const [testsState, updateTests] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        let newCommits = [0, 0, 0, 0, 0];
        client.get("repository/contributors")
        .then((response) => {
            response.data.forEach((element) => {
                const { name, email, commits } = element;
                team.forEach((member) => {
                    if (member.name === name || member.email === email 
                        || member.gitlab_username === name) {
                        newCommits[names[member.name]] += commits;
                    }
                });
            });
            updateCommits(newCommits);
        });

        let newIssues = [0, 0, 0, 0, 0];
        team.forEach((member) => {
            client.get("issues_statistics?assignee_username=" + member.gitlab_username)
            .then((response) => {
                newIssues[names[member.name]] += response.data['statistics']['counts']['closed'];
            })
        })
        updateIssues(newIssues);
      }, []);
    
    return(
        <Container>
            <h1>About Us</h1>
            <h2>Purpose and Results</h2>
            <p>GalleryGuide was created with the purpose of helping ordinary citizens better connect to art. Whether they've already found an artist they like and want to learn more, want to get to know more about a work that strikes a chord in them, or want to get out and explore the galleries their city or state has to offer, GalleryGuide provides information that can enrich the lives of its users.</p>
            <p>With GalleryGuide, users can better understand what artists and artworks a particular gallery is best suited for (by looking at a Gallery instance), what effect a particular generation had on the works of art produced (by sorting artists by date of birth/death), and where to view a particular piece of art if it's on display (by looking at an Artwork instance).</p>
            <h1>Members</h1>
            <Row>
                {
                    team.map((member) => {
                        return (
                            <Col md="auto">
                                <Card
                                    bg={'dark'}
                                    text={'white'}
                                    style={{ width: '15rem', height: '50rem' }}>
                                    <Card.Img variant="top" src={member.image} />
                                    <Card.Body>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Subtitle>{"Role: " + member.role}</Card.Subtitle>
                                        <Card.Text>{"Gitlab ID: " + member.gitlab_username}</Card.Text>
                                        <Card.Text>{"About me: " + member.bio}</Card.Text>
                                        <Card.Text>{"Commits: " + commitsState[names[member.name]]}</Card.Text>
                                        <Card.Text>{"Issues: " + issuesState[names[member.name]]}</Card.Text>
                                        <Card.Text>{"Unit Tests: " + member.tests}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <h2 className="d-flex justify-content-center p-4"> Total Stats</h2>
            <Row>
                <Col class="d-flex justify-content-center">
                    <h3>Total Commits: {commitsState.reduce((a, b) => a + b, 0)}</h3>
                </Col>
                <Col className="d-flex justify-content-center">
                    <h3>Total Issues: {issuesState.reduce((a, b) => a + b, 0)}</h3>
                </Col>
                <Col className="d-flex justify-content-center">
                    <h3>Total Tests: {testsState.reduce((a, b) => a + b, 0)}</h3>
                </Col>
            </Row>

            <h2 className="d-flex justify-content-center p-5"> Tools Used</h2>
            <Row>
                {
                    tools.map((tool) => {
                        return(
                            <Col md = "auto">
                            <Card
                                bg={'white'}
                                text={'dark'}
                                style={{ width: '16rem', margin: "1rem", height: '28rem'}}>
                                <Card.Img variant="top" src={tool.image} />
                                <Card.Body>
                                    <Card.Title>{tool.name}</Card.Title>
                                    <Card.Text>{tool.description}</Card.Text>
                                    <Link to={tool.link + ""}>{tool.link}</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })
                }
            </Row>
            <h2>Postman Documentation</h2>
            <p>Want to use our public APIs? We can't wait! Check out our Postman documentation made by our backend team <a href="https://documenter.getpostman.com/view/18824630/2s93CExHF3" target={'_blank'}>here</a>!</p>
            <h3 className="d-flex justify-content-center p-4"> Data Sources</h3>
            <Row>
                {
                    sources.map((source) => {
                        return(
                            <Col md = "auto">
                            <Card
                                bg={'white'}
                                text={'dark'}
                                style={{ width: '22rem', margin: "2rem", height: '35rem'}}>
                                <Card.Img variant="top" src={source.image} />
                                <Card.Body>
                                    <Card.Title>{source.name}</Card.Title>
                                    <Card.Text>{source.description}</Card.Text>
                                    <Link to={source.link + ""}>{source.link}</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })
                }
            </Row>

            
        </Container>
    );
}
