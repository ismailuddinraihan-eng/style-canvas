document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    // 1. Open Login Modal
    if (openLoginBtn && loginModal) {
        openLoginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }

    // 2. Close Login Modal
    if (closeModalBtn && loginModal) {
        closeModalBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    // 3. Close Modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // 4. Search Handler
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query !== '') {
                alert(`Searching for: "${query}" in Men's Collection`);
            } else {
                alert('Please enter a product name to search');
            }
        });
    }

    // 5. Login Form Submit Handler (Database Connection)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (result.status === 'success') {
                    loginMessage.style.color = '#2e7d32';
                    loginMessage.innerText = `স্বাগতম! ডেটাবেজে সফলভাবে সেভ হয়েছে। 🚀`;

                    setTimeout(() => {
                        loginModal.style.display = 'none';
                        loginMessage.innerText = '';
                        loginForm.reset();
                    }, 2000);
                } else {
                    loginMessage.style.color = '#d32f2f';
                    loginMessage.innerText = `ত্রুটি: ${result.message}`;
                }
            } catch (error) {
                console.error('Error:', error);
                loginMessage.style.color = '#d32f2f';
                loginMessage.innerText = 'সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি!';
            }
        });
    }

    // 6. Add to Cart Interactivity
    let cartCountValue = 0;
    const cartCountElem = document.getElementById('cartCount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    const toast = document.createElement('div');
    toast.className = 'cart-notification';
    document.body.appendChild(toast);

    function showToast(message) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-name') || "Product";
            cartCountValue++;
            if (cartCountElem) cartCountElem.innerText = cartCountValue;
            
            e.target.innerText = "Added! ✓";
            e.target.style.backgroundColor = "#27ae60";
            
            setTimeout(() => {
                e.target.innerText = "Add to Cart";
                e.target.style.backgroundColor = "";
            }, 1500);

            showToast(`🛒 "${productName}" cart-এ যোগ করা হয়েছে!`);
        });
    });

    // 7. FAQ Accordion Interactivity
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // 8. Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});