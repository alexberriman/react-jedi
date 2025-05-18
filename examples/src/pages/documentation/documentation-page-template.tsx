import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Section {
  title: string;
  description: string;
  content: React.ReactNode;
  code?: string;
}

interface DocumentationPageTemplateProps {
  title: string;
  description: string;
  sections: Section[];
}

export function DocumentationPageTemplate({
  title,
  description,
  sections,
}: Readonly<DocumentationPageTemplateProps>) {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">{title}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>

        {sections.map((section, index) => (
          <Card key={index} className="p-6">
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{section.description}</p>

            {section.code ? (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-6">
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                    {section.content}
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-6">
                  <pre className="bg-zinc-950 text-zinc-300 p-4 rounded-lg overflow-x-auto">
                    <code>{section.code}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                {section.content}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
