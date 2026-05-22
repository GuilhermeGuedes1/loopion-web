export function openWhatsApp(phone: string, name: string) {
  const rawPhone = phone.replace(/\D/g, "");

  const formattedPhone = rawPhone.startsWith("55") ? rawPhone : `55${rawPhone}`;

  const message = `Olá, ${name}! Tudo bem? Já faz alguns dias desde sua última visita. Gostaria de agendar um novo horário?`;

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}
