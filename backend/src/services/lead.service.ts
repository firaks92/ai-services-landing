import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface CreateLeadDto {
  quizSource: string;
  serviceFocus: {
    serviceCode: string;
    primaryService: string;
    serviceDetails: string[];
    industry: string;
    timeline: string;
    budget: string;
  };
  residentInfo: {
    name: string;
    cityInput: string;
    preferredChannel: string;
    phone: string;
    telegramUsername?: string | null;
    comment?: string | null;
  };
  clientMeta: {
    language?: string | null;
    pageUrl?: string | null;
    referrer?: string | null;
    utm?: Record<string, string | null | undefined>;
  };
  geo: {
    ip: string;
    country?: string | null;
    region?: string | null;
    city?: string | null;
    timezone?: string | null;
  };
  deviceInfo?: string | null;
}

export class LeadService {
  /**
   * Generates unique lead code: AI-YYYYMMDD-XXXX
   */
  public generateLeadCode(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `AI-${year}${month}${day}-${randomSuffix}`;
  }

  /**
   * Creates a lead record in the database
   */
  public async createLead(dto: CreateLeadDto) {
    const leadCode = this.generateLeadCode();

    const created = await prisma.lead.create({
      data: {
        leadCode,
        quizSource: dto.quizSource,
        serviceCode: dto.serviceFocus.serviceCode,
        primaryService: dto.serviceFocus.primaryService,
        serviceDetails: JSON.stringify(dto.serviceFocus.serviceDetails),
        industry: dto.serviceFocus.industry,
        timeline: dto.serviceFocus.timeline,
        budget: dto.serviceFocus.budget,

        residentName: dto.residentInfo.name,
        cityInput: dto.residentInfo.cityInput,
        preferredChannel: dto.residentInfo.preferredChannel,
        phone: dto.residentInfo.phone,
        telegramUsername: dto.residentInfo.telegramUsername || null,
        comment: dto.residentInfo.comment || null,

        ipAddress: dto.geo.ip,
        geoCountry: dto.geo.country || null,
        geoRegion: dto.geo.region || null,
        geoCity: dto.geo.city || null,
        timezone: dto.geo.timezone || null,
        deviceInfo: dto.deviceInfo || null,
        browserLanguage: dto.clientMeta.language || null,
        pageUrl: dto.clientMeta.pageUrl || null,
        referrer: dto.clientMeta.referrer || null,
        utmData: dto.clientMeta.utm ? JSON.stringify(dto.clientMeta.utm) : null,

        status: 'NEW',
        deliveryStatus: 'PENDING',
        deliveryAttempts: 0,
      },
    });

    return created;
  }

  public async getLeadByCode(leadCode: string) {
    return prisma.lead.findUnique({
      where: { leadCode },
    });
  }

  public async updateStatus(
    leadCode: string,
    status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'SPAM',
    manager?: string
  ) {
    return prisma.lead.update({
      where: { leadCode },
      data: {
        status,
        ...(manager !== undefined ? { assignedManager: manager } : {}),
      },
    });
  }

  public async updateTelegramDelivery(
    leadCode: string,
    chatId: string,
    messageId: number,
    deliveryStatus: 'SENT' | 'FAILED'
  ) {
    return prisma.lead.update({
      where: { leadCode },
      data: {
        telegramChatId: chatId,
        telegramMessageId: messageId,
        deliveryStatus,
        deliveryAttempts: { increment: 1 },
      },
    });
  }

  public async updateClientTelegramId(leadCode: string, clientTelegramId: string) {
    return prisma.lead.update({
      where: { leadCode },
      data: { clientTelegramId },
    });
  }
}

export const leadService = new LeadService();
