<template>
  <div id="notification">
    <div>
      <i class="fas fa-2x"></i>
      <p></p>
      <i id="close-notifications" class="fas fa-times"></i>
    </div>
  </div>
</template>

<style>
#notification {
  width: 100%;
  position: fixed;
  text-align: center;
  color: var(--text-color);
  bottom: 1%;
}

#notification div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 50%;
  border-radius: 3px;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-color: var(--overlay-color);
  transform: translateY(150%);
  transition: 0.5s;
  padding: 0 3%;
  position: relative;
}

#notification p {
  padding: 0 3%;
}

#notification div i.fa-times:hover {
  cursor: pointer;
}

.success div {
  box-shadow: 0 0 2px #259c08;
  transform: translateY(0%) !important;
  z-index: 100;
}
.success div i:first-of-type {
  color: #0ad406;
}

.error div {
  box-shadow: 0 0 2px #ff0303;
  transform: translateY(0%) !important;
}
.error div i:first-of-type {
  color: #ff0303;
}

@media screen and (max-width: 900px) {

  #notification div {
    width: 60%;
  }
}

@media screen and (max-width: 768px) {

  #notification div {
    width: 70%;
  }
}

@media screen and (max-width: 480px) {

  #notification div {
    width: 85%;
  }
}
</style>
