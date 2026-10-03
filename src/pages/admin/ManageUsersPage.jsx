import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/slices/uiSlice';
import Button from '../../components/common/Button';
import { Users, Shield, UserCheck, Search, Filter, Ban, CheckCircle } from 'lucide-react';

const INITIAL_USERS = [
  { id: 'usr_1', name: 'Aman Sharma', email: 'student@example.com', role: 'student', status: 'active', joined: '2026-01-10' },
  { id: 'usr_2', name: 'Dr. Vikram Seth', email: 'instructor@example.com', role: 'instructor', status: 'active', joined: '2025-11-04' },
  { id: 'usr_3', name: 'System Admin', email: 'admin@example.com', role: 'admin', status: 'active', joined: '2025-08-20' },
  { id: 'usr_4', name: 'Pooja Verma', email: 'pooja.devops@example.com', role: 'instructor', status: 'active', joined: '2026-02-14' },
  { id: 'usr_5', name: 'Rohan Mehta', email: 'rohan.m@example.com', role: 'student', status: 'active', joined: '2026-02-28' },
  { id: 'usr_6', name: 'Kavita Pillai', email: 'kavita.ml@example.com', role: 'student', status: 'suspended', joined: '2026-03-01' },
];

const ManageUsersPage = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    dispatch(addToast({ type: 'success', message: `User role updated to ${newRole.toUpperCase()}` }));
  };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          dispatch(
            addToast({
              type: nextStatus === 'active' ? 'success' : 'error',
              message: `User marked as ${nextStatus}`,
            })
          );
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            User Management & RBAC Permissions
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Audit user accounts, grant instructor authorization, and enforce security policies.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 shadow-soft">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user name or email..."
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-brand-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-2 outline-none"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-4">Role (RBAC)</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.name}`}
                      alt={u.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{u.name}</span>
                      <span className="text-slate-400 text-[11px]">{u.email}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`font-bold text-[11px] uppercase tracking-wider px-2 py-1 rounded-lg border outline-none ${
                        u.role === 'admin'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : u.role === 'instructor'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {u.joined}
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                        u.status === 'active'
                          ? 'text-rose-600 hover:bg-rose-50'
                          : 'text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
