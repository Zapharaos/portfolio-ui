<template>
  <header>
    <div id="menu">
      <a id="header-logo">
        <img id="nav-logo" src="../assets/logo.png" alt="Logo">
      </a>
      <div id="bars">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
    <nav>
      <ul>
        <li><a id="header-aboutme">About me</a></li>
        <li><a id="header-experience">Experience</a></li>
        <li><a id="header-formation">Formation</a></li>
        <li><a id="header-project">Project</a></li>
        <li><a id="header-contact">Contact</a></li>
        <li id="theme-switcher"><i class="fas fa-moon"></i></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
