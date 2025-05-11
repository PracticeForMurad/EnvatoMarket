document.addEventListener('DOMContentLoaded', function() {
  const words = ["landing", "magazines", "website", "portfolio", "e-shop"];
  let index = 0;
  const wordElement = document.getElementById("changing-word");

  wordElement.textContent = words[0];

  function changeWord() {
      wordElement.style.animation = 'none';
      
      index = (index + 1) % words.length;
      
      void wordElement.offsetWidth;
      
      wordElement.textContent = words[index];
      
      wordElement.style.animation = 'fadeSlide 2s ease-in-out';
  }

  setTimeout(() => {
      setInterval(changeWord, 2000);
  }, 500);

  document.getElementById('showMoreBtn').addEventListener('click', function () {
      const hiddenItems = document.querySelectorAll('.preview.hidden');
      hiddenItems.forEach(item => item.classList.remove('hidden'));
      this.style.display = 'none'; 
  });
});