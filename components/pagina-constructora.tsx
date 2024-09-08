'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { HardHat, Wrench, Building2, Shield, Clock, ThumbsUp, History, Sun, Moon, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react'

export function PaginaConstructora() {
  const [opacity, setOpacity] = useState(0)
  const [showText, setShowText] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [currentPartner, setCurrentPartner] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSocialIcons, setShowSocialIcons] = useState(false)

  const phrases = [
    { text: "Eficiencia y honestidad, la base de un buen servicio", highlight: ["Eficiencia", "honestidad", "servicio"] },
    { text: "Construyendo el futuro con calidad y compromiso", highlight: ["futuro", "calidad", "compromiso"] },
    { text: "Innovación y experiencia en cada proyecto", highlight: ["Innovación", "experiencia", "proyecto"] }
  ]

  const services = [
    { 
      title: "Construcción de Galpones", 
      icon: HardHat, 
      description: "Diseñamos y construimos galpones industriales de alta calidad, adaptados a sus necesidades específicas.",
      longDescription: "Nuestros galpones son diseñados con los más altos estándares de calidad y eficiencia energética. Utilizamos materiales duraderos y técnicas de construcción avanzadas para garantizar estructuras resistentes y funcionales."
    },
    { 
      title: "Mantenimiento", 
      icon: Wrench, 
      description: "Ofrecemos servicios de mantenimiento integral para asegurar la longevidad y eficiencia de sus instalaciones.",
      longDescription: "Nuestro equipo de expertos realiza mantenimientos preventivos y correctivos, asegurando que sus instalaciones funcionen de manera óptima y prolongando su vida útil."
    },
    { 
      title: "Construcciones Especiales", 
      icon: Building2, 
      description: "Realizamos construcciones especiales que cumplen con los más altos estándares de calidad y normativas vigentes.",
      longDescription: "Desde edificios comerciales hasta estructuras industriales complejas, nuestro equipo tiene la experiencia para llevar a cabo proyectos desafiantes con precisión y excelencia."
    }
  ]

  const values = [
    { icon: Shield, title: "Seguridad", description: "La seguridad es nuestra prioridad en cada proyecto que emprendemos." },
    { icon: Clock, title: "Eficiencia", description: "Optimizamos nuestros procesos para entregar resultados de calidad en tiempo récord." },
    { icon: ThumbsUp, title: "Honestidad", description: "Trabajamos con transparencia y ética en todas nuestras operaciones." },
    { icon: History, title: "Experiencia", description: "Nuestra trayectoria nos respalda, aportando conocimiento y solidez a cada proyecto." }
  ]

  const partners = [
    "/images/partner1.png",
    "/images/partner2.png",
    "/images/partner3.png",
    "/images/partner4.png",
  ]

  useEffect(() => {
    const darkening = setTimeout(() => {
      const interval = setInterval(() => {
        setOpacity(prev => {
          if (prev >= 0.7) {
            clearInterval(interval)
            setShowText(true)
            return 0.7
          }
          return prev + 0.01
        })
      }, 30)
      return () => clearInterval(interval)
    }, 2000)

    const phraseInterval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length)
    }, 5000)

    const partnerInterval = setInterval(() => {
      setCurrentPartner((current) => (current + 1) % partners.length)
    }, 3000)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowMenu(scrollPosition > window.innerHeight)
      
      const sections = ['home', 'servicios', 'partners', 'nosotros', 'contacto']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(darkening)
      clearInterval(phraseInterval)
      clearInterval(partnerInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const highlightWord = (word: string, highlight: string[]) => {
    return highlight.includes(word) ? 'text-blue-400' : 'text-white'
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Aquí puedes agregar lógica adicional para cambiar clases o estilos globales
  }

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top Menu */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} bg-opacity-90`}
        initial={{ y: -100 }}
        animate={{ y: showMenu ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo de la empresa"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}></span>
          </div>
          <ul className="flex space-x-4">
            {['Home', 'Servicios', 'Partners', 'Nosotros', 'Contacto'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : isDarkMode ? 'text-white hover:text-blue-300' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Home Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/construccion-background.jpg"
            alt="Fondo de construcción"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={100}
            priority
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-full max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                {phrases[phraseIndex].text.split(' ').map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className={`${highlightWord(word, phrases[phraseIndex].highlight)} inline-block mx-1`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: wordIndex * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          className="absolute inset-x-0 bottom-16 flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Contáctanos Ahora
          </motion.button>
        </motion.div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden flex flex-col`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 relative">
                  <Image
                    src={`/images/service-${index + 1}.jpg`}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <service.icon className={`w-12 h-12 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} mb-4`} />
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{service.description}</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-auto`}>{service.longDescription}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

                        {/* Partners Section */}
      <section id="partners" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestros Partners</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentPartner * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {partners.map((partner, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4 flex items-center justify-center" style={{ height: '200px' }}>
                    <Image
                      src={partner}
                      alt={`Partner ${index + 1}`}
                      width={200}
                      height={100}
                      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="flex justify-center mt-4">
              {partners.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    currentPartner === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentPartner(index)}
                  aria-label={`Ver partner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Nosotros Section */}
      <section id="nosotros" className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <value.icon className={`w-16 h-16 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} mx-auto mb-4`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contáctanos</h2>
          <div className="max-w-lg mx-auto">
            <form className="space-y-4">
              <input type="text" placeholder="Nombre" className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`} />
              <input type="email" placeholder="Email" className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`} />
              <textarea placeholder="Mensaje" rows={4} className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}></textarea>
              <Button className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded transition duration-300`}>
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2023 Constructora El Futuro. Todos los derechos reservados.</p>
            </div>
            <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
              <p>Teléfono: +1 234 567 890</p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <Linkedin size={24} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Icons */}
      <div 
        className="fixed bottom-4 right-4 z-50"
        onMouseEnter={() => setShowSocialIcons(true)}
        onMouseLeave={() => setShowSocialIcons(false)}
      >
        <motion.div
          className="relative"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <button className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
            <MessageCircle size={24} />
          </button>
          <AnimatePresence>
            {showSocialIcons && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 flex flex-col items-end space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white`}>
                  <MessageCircle size={24} />
                </a>
                <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-blue-400' : 'bg-blue-400'} text-white`}>
                  <Send size={24} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}