import { TouchableOpacity } from "react-native";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export const UserMenu = () => {
  const { navigate } = useAppNavigation();

  return (
    <nav className="flex flex-col w-64 bg-slate-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <div className="space-y-2">
        <TouchableOpacity onPress={() => navigate("LoginScreen")}>
          {/* <User size={20} /> */}
          <span>Edit Profile</span>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate("LoginScreen")}>
          {/* <Building size={20} /> */}
          <span>Create Company</span>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate("LoginScreen")}>
          {/* <Settings size={20} /> */}
          <span>General Settings</span>
        </TouchableOpacity>
      </div>

      <button className="mt-auto flex items-center gap-3 p-2 text-red-400 hover:bg-slate-800 rounded">
        {/* <LogOut size={20} /> */}
        <span>Logout</span>
      </button>
    </nav>
  );
};
