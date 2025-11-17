// "use client";

// import { useOpsBot } from "@/context/json-context";
// import Link from "next/link";
// import { useState } from "react";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// export default function OpsBotJsonEditor() {
//   const { data, setData } = useOpsBot();

//   const [localSections, setLocalSections] = useState({
//     header: JSON.stringify(data.header, null, 2),
//     search: JSON.stringify(data.search, null, 2),
//     sections: JSON.stringify(data.sections, null, 2),
//     footerSection: JSON.stringify(data.footerSection, null, 2),
//     chat: JSON.stringify(data.chat, null, 2),
//   });

//   const [error, setError] = useState(null);

//   const handleChange = (key, value) => {
//     setLocalSections((prev) => ({ ...prev, [key]: value }));
//     setError(null);
//   };

//   const saveChanges = () => {
//     try {
//       const updated = {
//         header: JSON.parse(localSections.header),
//         search: JSON.parse(localSections.search),
//         sections: JSON.parse(localSections.sections),
//         footerSection: JSON.parse(localSections.footerSection),
//         chat: JSON.parse(localSections.chat),
//       };

//       setData(updated);
//       toast.success("OpsBot data saved successfully!");
//     } catch (err) {
//       setError("Invalid JSON detected: " + err.message);
//     }
//   };

//   const renderEditor = (label: any) => (
//     <ScrollArea className="h-[600px] w-[900px] rounded-md border bg-gray-950 p-4">
//       <Textarea
//         value={localSections[label]}
//         onChange={(e) => handleChange(label, e.target.value)}
//         className="min-h-[450px] font-mono text-sm text-white bg-gray-900 border-gray-700 focus:ring-blue-400"
//       />
//     </ScrollArea>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <Card className="shadow-lg border rounded-2xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             OpsBot JSON Editor
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <Tabs defaultValue="header" className="w-full">
//             <TabsList className="grid grid-cols-5 text-sm">
//               <TabsTrigger value="header" className="cursor-pointer">
//                 Header
//               </TabsTrigger>
//               <TabsTrigger value="search" className="cursor-pointer">
//                 Search
//               </TabsTrigger>
//               <TabsTrigger value="sections" className="cursor-pointer">
//                 Sections
//               </TabsTrigger>
//               <TabsTrigger value="footerSection" className="cursor-pointer">
//                 Footer
//               </TabsTrigger>
//               <TabsTrigger value="chat" className="cursor-pointer">
//                 Chat
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="header">{renderEditor("header")}</TabsContent>
//             <TabsContent value="search">{renderEditor("search")}</TabsContent>
//             <TabsContent value="sections">
//               {renderEditor("sections")}
//             </TabsContent>
//             <TabsContent value="footerSection">
//               {renderEditor("footerSection")}
//             </TabsContent>
//             <TabsContent value="chat">{renderEditor("chat")}</TabsContent>
//           </Tabs>

//           {error && <p className="text-red-500 font-medium">{error}</p>}

//           <div className="flex gap-4 pt-2">
//             <Button onClick={saveChanges} className="px-6 py-2">
//               Save Changes
//             </Button>

//             <Link href="/">
//               <Button variant="secondary" className="px-6 py-2">
//                 Home
//               </Button>
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useOpsBot } from "@/context/json-context";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface OpsBotJson {
  header: any;
  search: any;
  sections: any;
  footerSection: any;
  chat: any;
}

interface LocalSections {
  header: string;
  search: string;
  sections: string;
  footerSection: string;
  chat: string;
}

export default function OpsBotJsonEditor() {
  const { data, setData } = useOpsBot();
  const typedData = data as OpsBotJson;

  const [localSections, setLocalSections] = useState<LocalSections>({
    header: JSON.stringify(typedData.header, null, 2),
    search: JSON.stringify(typedData.search, null, 2),
    sections: JSON.stringify(typedData.sections, null, 2),
    footerSection: JSON.stringify(typedData.footerSection, null, 2),
    chat: JSON.stringify(typedData.chat, null, 2),
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof LocalSections, value: string) => {
    setLocalSections((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const saveChanges = () => {
    try {
      const updated: OpsBotJson = {
        header: JSON.parse(localSections.header),
        search: JSON.parse(localSections.search),
        sections: JSON.parse(localSections.sections),
        footerSection: JSON.parse(localSections.footerSection),
        chat: JSON.parse(localSections.chat),
      };

      setData(updated);
      toast.success("OpsBot data saved successfully!");
    } catch (err: any) {
      setError("Invalid JSON detected: " + err.message);
    }
  };

  const renderEditor = (label: keyof LocalSections) => (
    <ScrollArea className="h-[650px] w-full rounded-md border bg-gray-950 p-4">
      <Textarea
        value={localSections[label]}
        onChange={(e) => handleChange(label, e.target.value)}
        className="min-h-[600px] font-mono text-sm text-white bg-gray-900 border-gray-700 focus:ring-blue-400"
      />
    </ScrollArea>
  );

  return (
    <div className="p-6 w-[1300px] mx-auto space-y-6">
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            OpsBot JSON Editor
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="header" className="w-full">
            <TabsList className="grid grid-cols-5 text-sm">
              <TabsTrigger className="cursor-pointer" value="header">
                Header
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="search">
                Search
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="sections">
                Sections
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="footerSection">
                Footer
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="chat">
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="header">{renderEditor("header")}</TabsContent>
            <TabsContent value="search">{renderEditor("search")}</TabsContent>
            <TabsContent value="sections">
              {renderEditor("sections")}
            </TabsContent>
            <TabsContent value="footerSection">
              {renderEditor("footerSection")}
            </TabsContent>
            <TabsContent value="chat">{renderEditor("chat")}</TabsContent>
          </Tabs>

          {error && <p className="text-red-500 font-medium">{error}</p>}

          <div className="flex gap-4 pt-2">
            <Button onClick={saveChanges} className="px-6 py-2">
              Save Changes
            </Button>

            <Link href="/">
              <Button variant="secondary" className="px-6 py-2">
                Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
