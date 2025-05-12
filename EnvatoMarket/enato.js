document.addEventListener('DOMContentLoaded', function() {
    fetch('images.json')
      .then(response => response.json())
      .then(data => {
        initializeWordAnimation(data.wordAnimation);
        setupCategories(data.categoryLabels);
        loadImages(data.demoImages);
        setupShowMoreButton();
      })
      .catch(error => console.error('Error loading JSON data:', error));
  
    function initializeWordAnimation(animationData) {
      const words = animationData.words;
      let index = 0;
      const wordElement = document.getElementById("changing-word");
  
      if (!wordElement) return;
  
      wordElement.textContent = words[0];
  
      function changeWord() {
        wordElement.style.animation = 'none';
        index = (index + 1) % words.length;
        void wordElement.offsetWidth; 
        wordElement.textContent = words[index];
        wordElement.style.animation = 'fadeSlide 2s ease-in-out';
      }
  
      setTimeout(() => {
        setInterval(changeWord, animationData.interval);
      }, 500);
    }
  
    function setupCategories(categories) {
      const categoryNav = document.querySelector('.catagories nav');
      
      if (!categoryNav) return;
      
      categoryNav.innerHTML = '';
      
      Object.entries(categories).forEach(([key, label]) => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = label;
        if (key === 'all') {
          link.classList.add('active');
        }
        link.dataset.category = key;
        categoryNav.appendChild(link);
        
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          document.querySelectorAll('.catagories nav a').forEach(a => {
            a.classList.remove('active');
          });
          
          this.classList.add('active');
          
          filterImages(this.dataset.category);
        });
      });
    }
  
    function loadImages(images) {
      const previewsContainer = document.querySelector('.previews');
      
      if (!previewsContainer) return;
      
      const btnContainer = document.querySelector('.btn-container');
      previewsContainer.innerHTML = '';
      if (btnContainer) {
        previewsContainer.appendChild(btnContainer);
      }
      
      images.forEach(image => {
        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('preview');
        if (image.hidden) {
          link.classList.add('hidden');
        }
        
        image.category.forEach(cat => {
          link.dataset[cat] = true;
        });
        
        const img = document.createElement('img');
        img.src = image.url;
        link.appendChild(img);
        
        if (btnContainer) {
          previewsContainer.insertBefore(link, btnContainer);
        } else {
          previewsContainer.appendChild(link);
        }
      });
    }
  
    function filterImages(category) {
      document.querySelectorAll('.previews .preview').forEach(preview => {
        if (category === 'all' || preview.dataset[category]) {
          preview.style.display = '';
        } else {
          preview.style.display = 'none';
        }
      });
    }
  
    function setupShowMoreButton() {
      const showMoreBtn = document.getElementById('showMoreBtn');
      if (!showMoreBtn) return;
      
      showMoreBtn.addEventListener('click', function() {
        const hiddenItems = document.querySelectorAll('.preview.hidden');
        hiddenItems.forEach(item => item.classList.remove('hidden'));
        this.style.display = 'none';
      });
    }
  });