// Aguarda o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Anima o hamburger
        if (hamburger.classList.contains('active')) {
            hamburger.style.transform = 'rotate(45deg)';
        } else {
            hamburger.style.transform = 'rotate(0deg)';
        }
    });
    
    // Fecha o menu mobile quando clica em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        });
    });
    
    // Scroll suave para seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Change header background based on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animações de scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.about-card, .recipe-card, .testimonial-card, .product-card').forEach(el => {
        observer.observe(el);
    });
    
    // Adiciona CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        .about-card, .recipe-card, .testimonial-card, .product-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .about-card.animate-in, .recipe-card.animate-in, .testimonial-card.animate-in, .product-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .about-card:nth-child(1) { transition-delay: 0.1s; }
        .about-card:nth-child(2) { transition-delay: 0.2s; }
        .about-card:nth-child(3) { transition-delay: 0.3s; }
        .about-card:nth-child(4) { transition-delay: 0.4s; }
        
        .recipe-card:nth-child(1) { transition-delay: 0.1s; }
        .recipe-card:nth-child(2) { transition-delay: 0.2s; }
        .recipe-card:nth-child(3) { transition-delay: 0.3s; }
        .recipe-card:nth-child(4) { transition-delay: 0.4s; }
        
        .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        .visitor-counter {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        

    `;
    document.head.appendChild(style);
    
    // Função para simular compra (substitua pela integração real)
    function handlePurchase() {
        // Aqui você integraria com seu sistema de pagamento
        // Por exemplo: PagSeguro, Mercado Pago, Stripe, etc.
        
        // Simulação de loading
        const button = event.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        button.disabled = true;
        
        setTimeout(() => {
            // Simula redirecionamento para checkout
            alert('Redirecionando para o checkout...\n\nEm produção, aqui você redirecionaria para sua plataforma de pagamento preferida.');
            
            // Restaura o botão
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Adiciona evento de clique para todos os botões CTA
    ctaButtons.forEach(button => {
        button.addEventListener('click', handlePurchase);
    });
    

    
    // Contador de visitantes (simulado)
    function updateVisitorCounter() {
        const counter = document.createElement('div');
        counter.className = 'visitor-counter';
        counter.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #F8B500, #FF8C00);
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(248, 181, 0, 0.4);
            z-index: 1000;
            animation: pulse 2s infinite;
        `;
        
        const visitors = Math.floor(Math.random() * 50) + 150;
        counter.innerHTML = `<i class="fas fa-eye"></i> ${visitors} pessoas visualizando`;
        
        document.body.appendChild(counter);
        
        // Atualiza o contador a cada 30 segundos
        setInterval(() => {
            const newVisitors = Math.floor(Math.random() * 50) + 150;
            counter.innerHTML = `<i class="fas fa-eye"></i> ${newVisitors} pessoas visualizando`;
        }, 30000);
    }
    
    // Inicia o contador após 5 segundos
    setTimeout(updateVisitorCounter, 5000);
    
    // Efeito de parallax no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animação dos elementos do desert
    function animateDesertElements() {
        const cactus1 = document.querySelector('.cactus-1');
        const cactus2 = document.querySelector('.cactus-2');
        const sun = document.querySelector('.sun');
        
        if (cactus1) {
            cactus1.style.animation = 'sway 4s ease-in-out infinite';
        }
        
        if (cactus2) {
            cactus2.style.animation = 'sway 3s ease-in-out infinite reverse';
        }
        
        if (sun) {
            sun.style.animation = 'rotate 20s linear infinite';
        }
        
        // Adiciona as animações ao CSS
        const desertStyle = document.createElement('style');
        desertStyle.textContent = `
            @keyframes sway {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(2deg); }
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(desertStyle);
    }
    
    // Inicia as animações do desert
    animateDesertElements();
    
    // Lazy loading para imagens
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(45deg, #F8B500, #FF8C00);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(248, 181, 0, 0.4);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        transform: translateY(100px);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostra/esconde o botão de voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(100px)';
        }
    });
    
    // Funcionalidade do botão de voltar ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito de hover nos cards
    document.querySelectorAll('.about-card, .recipe-card, .testimonial-card, .product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    

    
    // Função para criar notificações de compra (social proof)
    function createPurchaseNotification() {
        const notifications = [
            { name: 'Maria Silva', city: 'Recife, PE', time: '2 min' },
            { name: 'João Santos', city: 'Fortaleza, CE', time: '5 min' },
            { name: 'Ana Costa', city: 'Salvador, BA', time: '8 min' },
            { name: 'Pedro Oliveira', city: 'Natal, RN', time: '12 min' },
            { name: 'Carla Mendes', city: 'Maceió, AL', time: '15 min' }
        ];
        
        function showNotification() {
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            
            const notification = document.createElement('div');
            notification.className = 'purchase-notification';
            notification.innerHTML = `
                <div class="notification-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="notification-content">
                    <strong>${randomNotification.name}</strong> de ${randomNotification.city}
                    <br>
                    <small>Comprou há ${randomNotification.time}</small>
                </div>
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
            `;
            
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 280px;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            `;
            
            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                .notification-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(45deg, #F8B500, #FF8C00);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }
                
                .notification-content {
                    flex: 1;
                    font-size: 0.9rem;
                }
                
                .notification-icon {
                    color: #28a745;
                    font-size: 1.2rem;
                }
            `;
            
            if (!document.querySelector('#notification-style')) {
                notificationStyle.id = 'notification-style';
                document.head.appendChild(notificationStyle);
            }
            
            document.body.appendChild(notification);
            
            // Anima a entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove após 4 segundos
            setTimeout(() => {
                notification.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 4000);
        }
        
        // Mostra primeira notificação após 15 segundos
        setTimeout(showNotification, 15000);
        
        // Mostra notificações a cada 30 segundos
        setInterval(showNotification, 30000);
    }
    
    // Inicia as notificações de compra
    createPurchaseNotification();
    
    // Adiciona favicon dinâmico
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍽️</text></svg>';
    document.head.appendChild(favicon);
    
    console.log('Gourmet do Sertão - Website carregado com sucesso! 🍽️');
});