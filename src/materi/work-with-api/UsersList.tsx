import { useEffect, useState } from "react";
import type { User } from "./type";
import {
  getUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
} from "./api/users";

type EditingUser = {
  id: number;
  name: string;
  username: string;
  email: string;
} | null;

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<EditingUser>(null);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const createUser = async () => {
    const newUser: Omit<User, "id"> = {
      name: "New User",
      username: "newuser",
      email: "user@user.com",
    };
    try {
      const data: User = await handleCreateUser(newUser);
      setUsers([...users, data]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while creating user"
      );
    }
  };

  // updateUser will be used to save edited user data (from inline form)
  const updateUser = async (updated: Partial<User>) => {
    try {
      setSaving(true);
      const userData: User = await handleUpdateUser(updated);
      setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
      setEditingUser(null);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating user"
      );
    }
  };

  const deleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await handleDeleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting user"
      );
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Loading Data...</h2>
          <p>Please wait while we fetch the users data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card" style={{ borderColor: "#dc3545" }}>
          <h2 style={{ color: "#dc3545" }}>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Users Data</h1>
        <button className="add-button" onClick={createUser}>
          <span>➕ Add New User</span>
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editingUser.username}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="action-cell">
                      <button
                        className="button button-primary"
                        onClick={() =>
                          updateUser({
                            id: editingUser.id,
                            name: editingUser.name,
                            username: editingUser.username,
                            email: editingUser.email,
                          })
                        }
                        disabled={saving}
                        style={{ marginRight: "8px" }}
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        className="button"
                        onClick={() => setEditingUser(null)}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="action-cell">
                      <button
                        className="button button-primary"
                        onClick={() =>
                          setEditingUser({
                            id: user.id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                          })
                        }
                        style={{ marginRight: "8px" }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="button button-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
