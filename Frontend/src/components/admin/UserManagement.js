import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Edit, Trash2, Shield, Search, Check, X, Key } from 'lucide-react';

const ROLES = ['Analyst', 'Senior Analyst', 'Manager', 'Director', 'Administrator'];
const CLEARANCE_LEVELS = ['Public', 'Confidential', 'Secret', 'Top Secret'];

const UserManagement = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'AGENT SUVANWIT',
            email: 'suvanwit@threatintel.secure',
            role: 'Administrator',
            clearanceLevel: 'Top Secret',
            status: 'Active',
            lastLogin: '2026-02-17 14:30:00',
            createdAt: '2026-01-15'
        },
        {
            id: 2,
            username: 'AGENT SMITH',
            email: 'smith@threatintel.secure',
            role: 'Senior Analyst',
            clearanceLevel: 'Secret',
            status: 'Active',
            lastLogin: '2026-02-17 12:15:00',
            createdAt: '2026-01-20'
        },
        {
            id: 3,
            username: 'AGENT JONES',
            email: 'jones@threatintel.secure',
            role: 'Analyst',
            clearanceLevel: 'Confidential',
            status: 'Inactive',
            lastLogin: '2026-02-10 09:45:00',
            createdAt: '2026-02-01'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Analyst',
        clearanceLevel: 'Public',
        status: 'Active'
    });

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            ...formData,
            lastLogin: 'Never',
            createdAt: new Date().toISOString().split('T')[0]
        };
        setUsers([...users, newUser]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditUser = () => {
        setUsers(users.map(user =>
            user.id === selectedUser.id
                ? { ...user, ...formData }
                : user
        ));
        setShowEditModal(false);
        resetForm();
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '',
            role: user.role,
            clearanceLevel: user.clearanceLevel,
            status: user.status
        });
        setShowEditModal(true);
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'Analyst',
            clearanceLevel: 'Public',
            status: 'Active'
        });
        setSelectedUser(null);
    };

    const getClearanceColor = (level) => {
        switch (level) {
            case 'Top Secret': return '#FF0000';
            case 'Secret': return '#FFA500';
            case 'Confidential': return '#FFFF00';
            case 'Public': return '#00FF00';
            default: return '#00FFCC';
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px'
            }}>
                <div>
                    <h2 style={{
                        color: '#00FFCC',
                        fontSize: '28px',
                        fontFamily: 'Orbitron, monospace',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <Users size={32} />
                        USER MANAGEMENT
                    </h2>
                    <p style={{
                        color: '#00FFCC',
                        fontSize: '12px',
                        fontFamily: 'Rajdhani, sans-serif',
                        opacity: 0.6,
                        letterSpacing: '2px'
                    }}>
                        MANAGE USERS, ROLES & CLEARANCE LEVELS
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(0, 255, 204, 0.3))',
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
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                    }}
                >
                    <Plus size={20} />
                    ADD NEW USER
                </motion.button>
            </div>

            {/* Search Bar */}
            <div style={{
                position: 'relative',
                marginBottom: '24px'
            }}>
                <Search
                    size={20}
                    color="#00FFCC"
                    style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        opacity: 0.5
                    }}
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by name, email, or role..."
                    style={{
                        width: '100%',
                        padding: '14px 14px 14px 48px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <StatCard
                    label="Total Users"
                    value={users.length}
                    color="#00FFCC"
                />
                <StatCard
                    label="Active Users"
                    value={users.filter(u => u.status === 'Active').length}
                    color="#00FF00"
                />
                <StatCard
                    label="Administrators"
                    value={users.filter(u => u.role === 'Administrator').length}
                    color="#FFA500"
                />
                <StatCard
                    label="Top Secret Clearance"
                    value={users.filter(u => u.clearanceLevel === 'Top Secret').length}
                    color="#FF0000"
                />
            </div>

            {/* Users Table */}
            <div style={{
                background: 'rgba(0, 20, 40, 0.6)',
                border: '2px solid rgba(0, 255, 204, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{
                            background: 'rgba(0, 255, 204, 0.1)',
                            borderBottom: '2px solid rgba(0, 255, 204, 0.3)'
                        }}>
                            <th style={tableHeaderStyle}>USERNAME</th>
                            <th style={tableHeaderStyle}>EMAIL</th>
                            <th style={tableHeaderStyle}>ROLE</th>
                            <th style={tableHeaderStyle}>CLEARANCE</th>
                            <th style={tableHeaderStyle}>STATUS</th>
                            <th style={tableHeaderStyle}>LAST LOGIN</th>
                            <th style={tableHeaderStyle}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                    borderBottom: '1px solid rgba(0, 255, 204, 0.1)'
                                }}
                            >
                                <td style={tableCellStyle}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <Shield size={16} color={getClearanceColor(user.clearanceLevel)} />
                                        <span style={{ fontWeight: 'bold' }}>{user.username}</span>
                                    </div>
                                </td>
                                <td style={tableCellStyle}>{user.email}</td>
                                <td style={tableCellStyle}>
                                    <span style={{
                                        padding: '4px 12px',
                                        background: 'rgba(0, 255, 204, 0.1)',
                                        border: '1px solid rgba(0, 255, 204, 0.3)',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: 'bold'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span style={{
                                        padding: '4px 12px',
                                        background: `${getClearanceColor(user.clearanceLevel)}20`,
                                        border: `1px solid ${getClearanceColor(user.clearanceLevel)}`,
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        color: getClearanceColor(user.clearanceLevel)
                                    }}>
                                        {user.clearanceLevel}
                                    </span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span style={{
                                        padding: '4px 12px',
                                        background: user.status === 'Active' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                                        border: user.status === 'Active' ? '1px solid #00FF00' : '1px solid #FF0000',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: 'bold',
                                        color: user.status === 'Active' ? '#00FF00' : '#FF0000'
                                    }}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={tableCellStyle}>
                                    <span style={{ fontSize: '12px', opacity: 0.7 }}>{user.lastLogin}</span>
                                </td>
                                <td style={tableCellStyle}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => openEditModal(user)}
                                            style={{
                                                background: 'rgba(0, 255, 204, 0.1)',
                                                border: '1px solid rgba(0, 255, 204, 0.3)',
                                                borderRadius: '4px',
                                                padding: '6px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            title="Edit User"
                                        >
                                            <Edit size={16} color="#00FFCC" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDeleteUser(user.id)}
                                            style={{
                                                background: 'rgba(255, 0, 0, 0.1)',
                                                border: '1px solid rgba(255, 0, 0, 0.3)',
                                                borderRadius: '4px',
                                                padding: '6px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} color="#FF0000" />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <UserModal
                        title="ADD NEW USER"
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleAddUser}
                        onClose={() => {
                            setShowAddModal(false);
                            resetForm();
                        }}
                        isEdit={false}
                    />
                )}
            </AnimatePresence>

            {/* Edit User Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <UserModal
                        title="EDIT USER"
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleEditUser}
                        onClose={() => {
                            setShowEditModal(false);
                            resetForm();
                        }}
                        isEdit={true}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ label, value, color }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
            background: 'rgba(0, 20, 40, 0.6)',
            border: `2px solid ${color}40`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
        }}
    >
        <p style={{
            color: color,
            fontSize: '32px',
            fontFamily: 'Orbitron, monospace',
            fontWeight: 'bold',
            marginBottom: '8px'
        }}>
            {value}
        </p>
        <p style={{
            color: '#00FFCC',
            fontSize: '11px',
            fontFamily: 'Rajdhani, sans-serif',
            opacity: 0.7,
            letterSpacing: '1px',
            textTransform: 'uppercase'
        }}>
            {label}
        </p>
    </motion.div>
);

// User Modal Component
const UserModal = ({ title, formData, setFormData, onSubmit, onClose, isEdit }) => {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'rgba(0, 20, 40, 0.95)',
                    border: '2px solid #00FFCC',
                    borderRadius: '12px',
                    padding: '32px',
                    width: '500px',
                    maxWidth: '90%'
                }}
            >
                <h3 style={{
                    color: '#00FFCC',
                    fontSize: '24px',
                    fontFamily: 'Orbitron, monospace',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <Key size={24} />
                    {title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <FormField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {!isEdit && (
                        <FormField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <FormSelect
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        options={ROLES}
                    />
                    <FormSelect
                        label="Clearance Level"
                        name="clearanceLevel"
                        value={formData.clearanceLevel}
                        onChange={handleChange}
                        options={CLEARANCE_LEVELS}
                    />
                    <FormSelect
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={['Active', 'Inactive']}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '24px'
                }}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onSubmit}
                        style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.2), rgba(0, 255, 204, 0.3))',
                            border: '2px solid #00FFCC',
                            borderRadius: '8px',
                            padding: '12px',
                            color: '#00FFCC',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontWeight: 'bold'
                        }}
                    >
                        <Check size={18} />
                        {isEdit ? 'UPDATE USER' : 'CREATE USER'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        style={{
                            flex: 1,
                            background: 'rgba(255, 0, 0, 0.1)',
                            border: '2px solid rgba(255, 0, 0, 0.5)',
                            borderRadius: '8px',
                            padding: '12px',
                            color: '#FF0000',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontWeight: 'bold'
                        }}
                    >
                        <X size={18} />
                        CANCEL
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Form Field Component
const FormField = ({ label, name, type, value, onChange, required }) => (
    <div>
        <label style={{
            color: '#00FFCC',
            fontSize: '12px',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '1px',
            marginBottom: '8px',
            display: 'block'
        }}>
            {label} {required && '*'}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0, 255, 204, 0.05)',
                border: '1px solid rgba(0, 255, 204, 0.3)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '14px',
                outline: 'none'
            }}
        />
    </div>
);

// Form Select Component
const FormSelect = ({ label, name, value, onChange, options }) => (
    <div>
        <label style={{
            color: '#00FFCC',
            fontSize: '12px',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '1px',
            marginBottom: '8px',
            display: 'block'
        }}>
            {label}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
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
            {options.map(option => (
                <option key={option} value={option} style={{ background: '#001428' }}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const tableHeaderStyle = {
    padding: '16px',
    textAlign: 'left',
    color: '#00FFCC',
    fontSize: '11px',
    fontFamily: 'Orbitron, monospace',
    fontWeight: 'bold',
    letterSpacing: '1px'
};

const tableCellStyle = {
    padding: '16px',
    color: '#FFFFFF',
    fontSize: '13px',
    fontFamily: 'Rajdhani, sans-serif'
};

export default UserManagement;
