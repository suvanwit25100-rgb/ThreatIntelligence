import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Shield, Globe, Lock, ArrowLeft } from 'lucide-react';

const ContactUs = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        clearanceLevel: 'public'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                clearanceLevel: 'public'
            });
        }, 3000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'linear-gradient(135deg, #001428 0%, #002040 50%, #001428 100%)',
            overflow: 'auto',
            zIndex: 2000
        }}>
            {/* Animated Background Grid */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(0, 255, 204, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 204, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                opacity: 0.3,
                pointerEvents: 'none'
            }} />

            {/* Back Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    background: 'rgba(0, 255, 204, 0.1)',
                    border: '2px solid #00FFCC',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    color: '#00FFCC',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 10
                }}
            >
                <ArrowLeft size={18} />
                BACK TO DASHBOARD
            </motion.button>

            {/* Main Content */}
            <div style={{
                position: 'relative',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '100px 24px 50px',
                zIndex: 1
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '16px'
                    }}>
                        <Shield size={40} color="#00FFCC" />
                        <h1 style={{
                            color: '#00FFCC',
                            fontSize: '48px',
                            fontFamily: 'Orbitron, monospace',
                            fontWeight: 'bold',
                            margin: 0,
                            textShadow: '0 0 20px rgba(0, 255, 204, 0.5)'
                        }}>
                            SECURE CONTACT
                        </h1>
                        <Shield size={40} color="#00FFCC" />
                    </div>
                    <p style={{
                        color: '#00FFCC',
                        fontSize: '16px',
                        fontFamily: 'Rajdhani, sans-serif',
                        opacity: 0.8,
                        letterSpacing: '2px'
                    }}>
                        ENCRYPTED COMMUNICATION CHANNEL
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr'
                    }
                }}>
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div style={{
                            background: 'rgba(0, 20, 40, 0.8)',
                            border: '2px solid #00FFCC',
                            borderRadius: '12px',
                            padding: '32px',
                            boxShadow: '0 0 30px rgba(0, 255, 204, 0.2)'
                        }}>
                            <h2 style={{
                                color: '#00FFCC',
                                fontSize: '24px',
                                fontFamily: 'Orbitron, monospace',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <Lock size={24} />
                                CONTACT INFORMATION
                            </h2>

                            {/* Contact Items */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px',
                                        background: 'rgba(0, 255, 204, 0.05)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(0, 255, 204, 0.2)'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #00FFCC'
                                    }}>
                                        <Mail size={24} color="#00FFCC" />
                                    </div>
                                    <div>
                                        <p style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0,
                                            opacity: 0.7,
                                            letterSpacing: '1px'
                                        }}>
                                            SECURE EMAIL
                                        </p>
                                        <p style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0
                                        }}>
                                            contact@threatintel.secure
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px',
                                        background: 'rgba(0, 255, 204, 0.05)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(0, 255, 204, 0.2)'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #00FFCC'
                                    }}>
                                        <Phone size={24} color="#00FFCC" />
                                    </div>
                                    <div>
                                        <p style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0,
                                            opacity: 0.7,
                                            letterSpacing: '1px'
                                        }}>
                                            ENCRYPTED LINE
                                        </p>
                                        <p style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0
                                        }}>
                                            +1 (555) INTEL-00
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px',
                                        background: 'rgba(0, 255, 204, 0.05)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(0, 255, 204, 0.2)'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #00FFCC'
                                    }}>
                                        <MapPin size={24} color="#00FFCC" />
                                    </div>
                                    <div>
                                        <p style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0,
                                            opacity: 0.7,
                                            letterSpacing: '1px'
                                        }}>
                                            HEADQUARTERS
                                        </p>
                                        <p style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0
                                        }}>
                                            Classified Location
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ x: 10 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px',
                                        background: 'rgba(0, 255, 204, 0.05)',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(0, 255, 204, 0.2)'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid #00FFCC'
                                    }}>
                                        <Globe size={24} color="#00FFCC" />
                                    </div>
                                    <div>
                                        <p style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0,
                                            opacity: 0.7,
                                            letterSpacing: '1px'
                                        }}>
                                            OPERATING HOURS
                                        </p>
                                        <p style={{
                                            color: '#FFFFFF',
                                            fontSize: '16px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            margin: 0
                                        }}>
                                            24/7 Global Coverage
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Security Notice */}
                            <div style={{
                                marginTop: '32px',
                                padding: '16px',
                                background: 'rgba(255, 165, 0, 0.1)',
                                border: '1px solid rgba(255, 165, 0, 0.3)',
                                borderRadius: '8px'
                            }}>
                                <p style={{
                                    color: '#FFA500',
                                    fontSize: '12px',
                                    fontFamily: 'Rajdhani, sans-serif',
                                    margin: 0,
                                    lineHeight: '1.6'
                                }}>
                                    <strong>SECURITY NOTICE:</strong> All communications are encrypted using military-grade protocols. Your information is protected under international intelligence sharing agreements.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div style={{
                            background: 'rgba(0, 20, 40, 0.8)',
                            border: '2px solid #00FFCC',
                            borderRadius: '12px',
                            padding: '32px',
                            boxShadow: '0 0 30px rgba(0, 255, 204, 0.2)'
                        }}>
                            <h2 style={{
                                color: '#00FFCC',
                                fontSize: '24px',
                                fontFamily: 'Orbitron, monospace',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <Send size={24} />
                                SEND SECURE MESSAGE
                            </h2>

                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{
                                        textAlign: 'center',
                                        padding: '40px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        borderRadius: '8px',
                                        border: '2px solid #00FFCC'
                                    }}
                                >
                                    <Shield size={64} color="#00FFCC" style={{ marginBottom: '16px' }} />
                                    <h3 style={{
                                        color: '#00FFCC',
                                        fontSize: '20px',
                                        fontFamily: 'Orbitron, monospace',
                                        marginBottom: '8px'
                                    }}>
                                        MESSAGE TRANSMITTED
                                    </h3>
                                    <p style={{
                                        color: '#FFFFFF',
                                        fontSize: '14px',
                                        fontFamily: 'Rajdhani, sans-serif',
                                        opacity: 0.8
                                    }}>
                                        Your secure message has been received. Our team will respond within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {/* Name Field */}
                                    <div>
                                        <label style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '1px',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            AGENT NAME *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'rgba(0, 255, 204, 0.05)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '6px',
                                                color: '#FFFFFF',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                fontSize: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#00FFCC'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 204, 0.3)'}
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '1px',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            SECURE EMAIL *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'rgba(0, 255, 204, 0.05)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '6px',
                                                color: '#FFFFFF',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                fontSize: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#00FFCC'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 204, 0.3)'}
                                        />
                                    </div>

                                    {/* Clearance Level */}
                                    <div>
                                        <label style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '1px',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            CLEARANCE LEVEL
                                        </label>
                                        <select
                                            name="clearanceLevel"
                                            value={formData.clearanceLevel}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'rgba(0, 255, 204, 0.05)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '6px',
                                                color: '#FFFFFF',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                fontSize: '14px',
                                                outline: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="public" style={{ background: '#001428' }}>PUBLIC</option>
                                            <option value="confidential" style={{ background: '#001428' }}>CONFIDENTIAL</option>
                                            <option value="secret" style={{ background: '#001428' }}>SECRET</option>
                                            <option value="top-secret" style={{ background: '#001428' }}>TOP SECRET</option>
                                        </select>
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '1px',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            SUBJECT *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'rgba(0, 255, 204, 0.05)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '6px',
                                                color: '#FFFFFF',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                fontSize: '14px',
                                                outline: 'none',
                                                transition: 'all 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#00FFCC'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 204, 0.3)'}
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label style={{
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            fontFamily: 'Rajdhani, sans-serif',
                                            letterSpacing: '1px',
                                            marginBottom: '8px',
                                            display: 'block'
                                        }}>
                                            MESSAGE *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                background: 'rgba(0, 255, 204, 0.05)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '6px',
                                                color: '#FFFFFF',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                fontSize: '14px',
                                                outline: 'none',
                                                resize: 'vertical',
                                                transition: 'all 0.3s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#00FFCC'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 204, 0.3)'}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(0, 255, 204, 0.3))',
                                            border: '2px solid #00FFCC',
                                            borderRadius: '8px',
                                            color: '#00FFCC',
                                            fontFamily: 'Orbitron, monospace',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            letterSpacing: '2px',
                                            boxShadow: '0 0 20px rgba(0, 255, 204, 0.3)'
                                        }}
                                    >
                                        <Send size={20} />
                                        TRANSMIT MESSAGE
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
