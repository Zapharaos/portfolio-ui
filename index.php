<!DOCTYPE html>
<html lang="en" id="header">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
    <title>Matthieu Freitag</title>
    <link rel="icon" href="img/v2.png">
    <link rel="stylesheet" href="CSS/theme.css">
    <link rel="stylesheet" href="CSS/header.css">
    <link rel="stylesheet" href="CSS/footer.css">
    <link rel="stylesheet" href="CSS/presentation.css">
    <link rel="stylesheet" href="CSS/aboutme.css">
    <link rel="stylesheet" href="CSS/tablists.css">
    <link rel="stylesheet" href="CSS/contact.css">
    <script src="https://kit.fontawesome.com/cd29c51f4b.js" crossorigin="anonymous"></script> <!-- ICONS -->
</head>

<body>
    <header>
        <div id="menu">
            <a onclick="goToByScroll('header', 'slow')"><img id="logo" src="img/v2.png"></a>
            <div id="bars">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
        </div>
        <nav>
            <ul>
                <li><a onclick="goToByScroll('aboutme', 'slow')">About me</a></li>
                <li><a onclick="goToByScroll('experience', 'slow')">Experience</a></li>
                <li><a onclick="goToByScroll('formation', 'slow')">Formation</a></li>
                <li><a onclick="goToByScroll('contact', 'slow')">Contact</a></li>
                <li onclick="switchTheme()"><i class="fas fa-moon"></i></li>
            </ul>
        </nav>
    </header>
    <section id="presentation">
        <h1>Hi, I'm Matthieu Freitag.</h1>
        <h2>Nice to meet you.</br> Please, take a look around!</h2>
        <div>
            <img id="back-logo" src="img/v4.png">
        </div>
    </section>
    <section id="aboutme">
        <h3>About me</h3>
        <div id="article">
            <div id="text">
                <p>My name is Matthieu Freitag. I'm a 22 year old french and german citizen.</p>
                <p>Currently, I'm an undergraduate student majoring computer science at Strasbourg University, France. Starting from September 2022, I'll continue my studies as a graduate student while working. Therefore, I'm now looking for a work-study contract.</p>
                <p>I'm more into software developing, but I also enjoy building websites on my spare time.</p>
            </div>
            <img id="pdp" src="img/pp.png">
        </div>
        <div id="more">
            <p>Learn more about me by checking out my socials.</p>
            <ul>
                <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
                <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
            </ul>
        </div>
    </section>
    <section id="experience">
        <h3>Experience</h3>
        <div class="tabs">
            <div class="tablist" role="tablistE" aria-label="Sample Tabs">
                <button class="tab" role="tabE" aria-selected="true" aria-controls="panel-11" id="tab-11" tabindex="0">
                    Kap Logistique
                </button>
                <button class="tab" role="tabE" aria-selected="false" aria-controls="panel-12" id="tab-12" tabindex="-1">
                    Communauté des Communes
                </button>
                <button class="tab" role="tabE" aria-selected="false" aria-controls="panel-13" id="tab-13" tabindex="-2">
                    SARL BTP La Fontaine
                </button>
                <button class="tab" role="tabE" aria-selected="false" aria-controls="panel-14" id="tab-14" tabindex="-3">
                    Steelcase
                </button>
            </div>
            <div class="panels">
                <div id="panel-11" role="tabpanelE" tabindex="0" aria-labelledby="tab-11">
                    <h1>Order picker</h1>
                    <h4>Kap Logistique</h4>
                    <h5>Molsheim, France</h5>
                    <p class="date">March 2021 - July 2021</p>
                    <div><p>Seasonal agent for a period of four months.</p></div>
                </div>
                <div id="panel-12" class="hidden" role="tabpanelE" tabindex="0" aria-labelledby="tab-12">
                    <h1>Pool Technical Services Assistant</h1>
                    <h4>Communauté des Communes</h4>
                    <h5>Molsheim, France</h5>
                    <p class="date">Summer 2019 & Summer 2020</p>
                    <div><p>Seasonal agent for the summer periods of 2019 and 2020.</p></div>
                </div>
                <div id="panel-13" class="hidden" role="tabpanelE" tabindex="0" aria-labelledby="tab-13">
                    <h1>Worker</h1>
                    <h4>SARL BTP La Fontaine</h4>
                    <h5>Mutzig, France</h5>
                    <p class="date">July 2017</p>
                    <div><p>Seasonal agent for a period of one month.</p></div>
                </div>
                <div id="panel-14" class="hidden" role="tabpanelE" tabindex="0" aria-labelledby="tab-14">
                    <h1>Intern</h1>
                    <h4>Steelcase</h4>
                    <h5>Schiltigheim, France</h5>
                    <p class="date">February 2016 - June 2016</p>
                    <div><p>Steelcase recruited ten high school students to shadow and mentor them on a project for half a day each week. Of the ten participants, five were selected to travel to Steelcase headquarters in Grand Rapids, Michigan. We were able to introduce the project to local employees as well as to the other participating countries: Mexico, Romania and the United States.</p></div>
                </div>
            </div>
        </div>
    </section>
    <section id="formation">
        <h3>Formation</h3>
        <div class="tabs">
            <div class="tablist" role="tablistF" aria-label="Sample Tabs">
                <button class="tab" role="tabF" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0">
                    Bachelor's degree
                </button>
                <button class="tab" role="tabF" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">
                    Baccalauréat
                </button>
                <button class="tab" role="tabF" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-2">
                    Others
                </button>
            </div>
            <div class="panels">
                <div id="panel-1" role="tabpanelF" tabindex="0" aria-labelledby="tab-1">
                    <h1>Bachelor of Science in Computer Science</h1>
                    <h4>Université de Strasbourg</h4>
                    <h5>Strasbourg, France</h5>
                    <p class="date">Since September 2018</p>
                    <div><p>The first semester is in common with the university degree in mathematics, and it is at the end of this first semester that I had the opportunity to choose the "Computer Science" orientation. The syllabus is available <a href="https://mathinfo.unistra.fr/formations/licence/informatique/#data-rof-tab-presentation">here</a>.</p></div>
                </div>
                <div id="panel-2" class="hidden" role="tabpanelF" tabindex="0" aria-labelledby="tab-2">
                    <h1>Baccalauréat Scientifique</h1>
                    <h4>Lycée Henrick Meck</h4>
                    <h5>Molsheim, France</h5>
                    <p class="date">September 2015 - June 2018</p>
                    <div><p>I graduated from high school (french baccalauréat) with a scientific orientation: mathematics, physics and biology. In addition to the classic courses, I also prepared for the ABIBAC exam (simultaneous graduation from both the french and german highschool) which I left before entering my final year. During my last year, I chose the ISN course "Informatique et Sciences du Numérique" where I first learned about computer science.</p></div>
                </div>
                <div id="panel-3" class="others hidden" role="tabpanelF" tabindex="0" aria-labelledby="tab-3">
                    <h1>Others</h1>
                    <ul>
                        <li>French driving license: Permis B<small>(2019)</small></li>
                        <li>German language diploma: Deutsches Sprachdiplom 1, B1 level<small>(2015)</small></li>
                        <li>Bilingual German education since kindergarten <small>(2003)</small></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="download">
            <p>Learn more about me by downloading my curriculum</p>
            <a href="download/curriculum.pdf" target="_blank">
                <button><i class="fa fa-download"></i>Download</button>
            </a>
        </div>
    </section>
    <section id="contact">
        <h3>Contact</h3>
        <form id="form">
            <div>
                <input type="text" id="name" name="name" placeholder="Name" tabindex="1" required>
                <input type="email" id="email" name="email" placeholder="Email" tabindex="2" required>
            </div>
            <input type="text" id="subject" name="subject" placeholder="Subject" tabindex="3" required>
            <textarea rows="5" id="message" name="message" placeholder="Message" tabindex="4" required></textarea>
            <button type="submit" name="submit" value="Submit">Submit</button>
            <input type="hidden" name="spam">
        </form>
    </section>
    <footer>
        <a href="https://github.com/Zapharaos/portfolio">© 2022 - Designed & Built by Matthieu Freitag</a>
        <ul>
            <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
            <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
        </ul>
    </footer>
    <div id="top">
        <a onclick="goToByScroll('header', 'fast')"><i class="fas fa-angle-up"></i></a>
    </div>
    <div id="overlay"></div>
    <div id="notification">
        <div>
            <i class="fas fa-2x"></i>
            <p></p>
            <i class="fas fa-times" onclick="toggleNotification(2,'')"></i>
        </div>
    </div>
    <script type="text/javascript" src="JS/global.js"></script>
    <script type="text/javascript" src="JS/logo_parallax.js"></script>
    <script type="text/javascript" src="JS/tablists.js"></script>
    <script type="text/javascript" src="JS/contact.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</body>
</html>

<?php
    include(PHP/contact.php);
?>