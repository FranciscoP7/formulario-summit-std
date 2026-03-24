  // Phone mask
    const telInput = document.getElementById('tel');
    telInput.addEventListener('input', () => {
      let v = telInput.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6)      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      telInput.value = v;
    });

    // Checkbox
    const checkWrapper = document.getElementById('check-wrapper');
    const termsInput = document.getElementById('terms');

    checkWrapper.addEventListener('click', () => {
      termsInput.checked = !termsInput.checked;
      checkWrapper.classList.toggle('checked', termsInput.checked);
    });

    // Validation
    function showErr(id, msg) { const el = document.getElementById(id); el.textContent = msg; el.classList.add('show'); }
    function clearErr(id) { document.getElementById(id).classList.remove('show'); }
    function markField(id, valid) {
      const el = document.getElementById(id);
      el.classList.toggle('valid', valid);
      el.classList.toggle('error', !valid);
    }

    ['nome','email','tel','nasc'].forEach(id => {
      document.getElementById(id).addEventListener('blur', () => validateField(id));
      document.getElementById(id).addEventListener('input', () => {
        if (document.getElementById(id).classList.contains('error')) validateField(id);
      });
    });

    function validateField(id) {
      const val = document.getElementById(id).value.trim();
      if (id === 'nome') {
        const ok = val.length >= 3;
        markField('nome', ok);
        ok ? clearErr('nome-err') : showErr('nome-err', 'Informe seu nome completo.');
        return ok;
      }
      if (id === 'email') {
        const ok = /^[^\s@]+@gmail\.com$/i.test(val);
        markField('email', ok);
        ok ? clearErr('email-err') : showErr('email-err', 'Insira um Gmail válido (ex: nome@gmail.com).');
        return ok;
      }
      if (id === 'tel') {
        const digits = val.replace(/\D/g,'');
        const ok = digits.length >= 10;
        markField('tel', ok);
        ok ? clearErr('tel-err') : showErr('tel-err', 'Telefone inválido. Informe DDD + número.');
        return ok;
      }
      if (id === 'nasc') {
        if (!val) { markField('nasc', false); showErr('nasc-err', 'Informe sua data de nascimento.'); return false; }
        const d = new Date(val);
        const age = (new Date() - d) / (1000*60*60*24*365.25);
        if (age < 16) { markField('nasc', false); showErr('nasc-err', 'Você precisa ter pelo menos 16 anos.'); return false; }
        if (age > 110) { markField('nasc', false); showErr('nasc-err', 'Data inválida.'); return false; }
        markField('nasc', true); clearErr('nasc-err'); return true;
      }
    }

    document.getElementById('submitBtn').addEventListener('click', () => {
      const v1 = validateField('nome');
      const v2 = validateField('email');
      const v3 = validateField('tel');
      const v4 = validateField('nasc');

      let v5 = true;
      if (!termsInput.checked) {
        document.getElementById('terms-err').classList.add('show');
        v5 = false;
      } else {
        document.getElementById('terms-err').classList.remove('show');
      }

      if (!v1 || !v2 || !v3 || !v4 || !v5) return;

      const code = 'SD26-' + Math.random().toString(36).slice(2,7).toUpperCase();
      document.getElementById('successCode').textContent = 'ID: ' + code;
      document.querySelector('.form-fields').classList.add('hide');
      document.getElementById('successState').classList.add('show');
    });
