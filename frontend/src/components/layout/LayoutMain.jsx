// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import CreatePost from "../post/CreatePost.jsx";
// import { useState } from "react";
// const LayoutMain = () => {
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const handlePostCreated = () => {
//     setShowCreatePost(false);
//   };
//   return (
//     <div className="min-h-screen bg-(--background) text-(--text-primary)">
//       <Navbar />

//       <Sidebar onCreatePost={() => setShowCreatePost(true)} />

//       <main className="pt-16 pl-64 min-h-screen">
//         <div className="max-w-7xl mx-auto p-6">
//           <Outlet
//             context={{
//               openCreatePost: () => setShowCreatePost(true),
//             }}
//           />
//         </div>
//       </main>

//       {showCreatePost && (
//         <CreatePost
//           onClose={() => setShowCreatePost(false)}
//           onPostCreated={handlePostCreated}
//         />
//       )}
//     </div>
//   );
// };

// export default LayoutMain;






// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import CreatePost from "../post/CreatePost.jsx";
// import { useState } from "react";

// const LayoutMain = () => {
//   const [showCreatePost, setShowCreatePost] =
//     useState(false);

//   const handlePostCreated = () => {
//     setShowCreatePost(false);
//   };

//   return (
//     <div className="min-h-screen bg-(--background) text-(--text-primary)">
      
//       {/* Navbar */}
//       <Navbar />

//       {/* Responsive Sidebar */}
//       <Sidebar
//         onCreatePost={() =>
//           setShowCreatePost(true)
//         }
//       />

//       {/* Main Content */}
//       <main
//         className="
//           min-h-screen
//           pt-16
//           pb-16

//           sm:pb-0
//           sm:pl-20

//           lg:pl-64
//         "
//       >
//         <div
//           className="
//             mx-auto
//             w-full
//             max-w-7xl

//             p-3
//             sm:p-4
//             md:p-5
//             lg:p-6
//           "
//         >
//           <Outlet
//             context={{
//               openCreatePost: () =>
//                 setShowCreatePost(true),
//             }}
//           />
//         </div>
//       </main>

//       {/* Create Post Modal */}
//       {showCreatePost && (
//         <CreatePost
//           onClose={() =>
//             setShowCreatePost(false)
//           }
//           onPostCreated={
//             handlePostCreated
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default LayoutMain;


























import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

// Only downloaded the first time someone opens "Create Post",
// so it no longer weighs down the initial bundle.
const CreatePost = lazy(() => import("../post/CreatePost.jsx"));

const LayoutMain = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  // stable references, so the memoized Sidebar doesn't re-render
  const openCreatePost = useCallback(() => setShowCreatePost(true), []);
  const closeCreatePost = useCallback(() => setShowCreatePost(false), []);

  // Previously the new post was thrown away here, so the Home feed and
  // your profile never showed it until a manual refresh. Now it is
  // broadcast and those pages prepend it.
  const handlePostCreated = useCallback((post) => {
    if (post) {
      window.dispatchEvent(new CustomEvent("post:created", { detail: post }));
    }
  }, []);

  const outletContext = useMemo(() => ({ openCreatePost }), [openCreatePost]);

  return (
    <div className="min-h-dvh bg-(--background) text-(--text-primary)">
      <Navbar />

      <Sidebar onCreatePost={openCreatePost} />

      <main className="min-h-dvh pb-16 pt-16 sm:pb-0 sm:pl-20 lg:pl-64">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-5 lg:p-6">
          <Outlet context={outletContext} />
        </div>
      </main>

      {showCreatePost && (
        <Suspense fallback={null}>
          <CreatePost
            onClose={closeCreatePost}
            onPostCreated={handlePostCreated}
          />
        </Suspense>
      )}
    </div>
  );
};

export default LayoutMain;