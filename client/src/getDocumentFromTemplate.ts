export function getDocumentFromTemplate(templateId: string): DocumentFragment {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  if (!template) throw new Error(`Template #${templateId} missing.`);
  return document.importNode(template.content, true);
}
