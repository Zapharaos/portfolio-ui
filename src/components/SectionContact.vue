<template>
  <section id="section-contact">
    <h3>Contact</h3>
    <form id="form-contact">
      <div>
        <input type="text" id="name" name="name" placeholder="Name" tabindex="1" required>
        <input type="email" id="email" name="email" placeholder="Email" tabindex="2" required>
      </div>
      <input type="text" id="subject" name="subject" placeholder="Subject" tabindex="3" required>
      <textarea rows="5" id="message" name="message" placeholder="Message" tabindex="4" required></textarea>
      <button type="submit" name="submit" value="Submit" tabindex="5">Submit</button>
      <input type="hidden" name="spam">
    </form>
  </section>
</template>

<script>
  export default {
    name: 'SectionContact',
  }
</script>
