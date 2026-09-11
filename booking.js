// Shared inquiry form handler — delivers to the same inbox as mamquamsauna.com
(function () {
  function initForm(form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = Object.fromEntries(new FormData(form).entries());

      try {
        var response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: '6c8db58e-e942-490b-8200-8bd9dfae4158',
            subject: 'New Sauna Inquiry (from WhistlerSaunas.com) - ' + (data.location || ''),
            from_name: 'Whistler Saunas Website',
            name: data.name,
            email: data.email,
            phone: data.phone || 'Not provided',
            location: data.location || 'Not specified',
            date: data.date || 'Not specified',
            message: data.message || 'No additional message',
          }),
        });
        var result = await response.json();
        if (result.success) {
          form.hidden = true;
          var successEl = form.parentElement.querySelector('.form-success');
          if (successEl) successEl.hidden = false;
        } else {
          alert('There was an error sending your request. Please try again or email mamquamsauna@gmail.com directly.');
        }
      } catch (err) {
        alert('There was an error sending your request. Please try again or email mamquamsauna@gmail.com directly.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  document.querySelectorAll('form[data-inquiry-form]').forEach(initForm);
})();
