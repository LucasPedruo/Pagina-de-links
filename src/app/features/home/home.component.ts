import { Component, signal } from '@angular/core';
import { NgxFastMarqueeModule } from 'ngx-fast-marquee';

import { environment } from '../../../environments/environment';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button';
import { ModalComponent } from '../../shared/components/custom-modal/custom-modal';
import { FooterComponent } from '../../shared/components/footer/footer-component';
import { GruposComponent } from '../grupos/grupos.component';
import { _fixeGroups } from '../grupos/group.model';

type EventCard = {
  name: string;
  stack: string;
  image: string;
  buttonText: string;
  link: string;
  dateLabel: string;
  featured: boolean;
  state: 'normal' | 'loading';
};
type EventPost = {
  event: string;
  name: string;
  handle: string;
  network: 'instagram' | 'linkedin';
  image: string;
  link: string;
};
type InstitutionalKey = 'eventos' | 'sobre' | 'mural' | 'redes' | 'equipe' | 'parceiros' | 'bot';
type BotDailyStats = {
  jobsDiscovered: number;
  jobsSent: number;
  eventsDiscovered: number;
  eventsSent: number;
  eventRemindersSent: number;
  networkingMessagesSent: number;
  failedMessages: number;
};
type BotStatusResponse = {
  whatsapp: { status: string; online: boolean };
  today: BotDailyStats;
  timezone: string;
  generatedAt: string;
};
type BotStatusState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-home-component',
  imports: [
    GruposComponent,
    CustomButtonComponent,
    FooterComponent,
    ModalComponent,
    NgxFastMarqueeModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly homeGroups = [
    {
      src: 'whatsapp.svg',
      text: 'Comunidade no WhatsApp',
      description: 'Grupo principal da comunidade',
      linkGroup: 'GtlHPlfmXlp27vPZVBej19',
    },
  ] as const;

  readonly emptyInstitutionalItems: readonly string[] = [];
  readonly headerLogoDefault = 'new-logo.png';
  readonly whatsappCommunityUrl = 'https://chat.whatsapp.com/GtlHPlfmXlp27vPZVBej19';
  readonly discordCommunityUrl = 'https://discord.com/invite/2vMkX7kc8t';
  readonly vscodeThemeUrl =
    'https://marketplace.visualstudio.com/items?itemName=FullDev.beru-theme';
  showModal: boolean = false;
  showInstitutionalModal = false;
  showVscodeThemeModal = false;
  activeInstitutionalKey: InstitutionalKey = 'sobre';
  appTitle = environment.appTitle;
  isProduction = environment.production;
  get featuredGroups() {
    return this.homeGroups.filter((group) => group.text === 'Comunidade no WhatsApp');
  }
  modalGroups = () => {
    const featuredGroupNames = new Set<string>(this.featuredGroups.map((group) => group.text));
    const hiddenHomeGroups = this.homeGroups.filter((group) => !featuredGroupNames.has(group.text));
    const groups = [...hiddenHomeGroups, ..._fixeGroups()];
    const seen = new Set<string>();

    return groups.filter((group) => {
      if (seen.has(group.text)) {
        return false;
      }

      seen.add(group.text);
      return true;
    });
  };
  teamSections = [
    {
      title: 'Conselho',
      members: [
        {
          name: 'Lucas Pedro',
          stack: 'Fundador da FullDev',
          image: 'equipe/lucas.jpg',
          linkedin: 'https://www.linkedin.com/in/lucaspedruo/',
        },
        {
          name: 'Matheus Braz',
          stack: 'Vice diretor',
          image: 'equipe/math.jpg',
          linkedin: 'https://www.linkedin.com/in/matheus-braz-gs/',
        },
        {
          name: 'Lyssa Oliveira',
          stack: 'Fundadora do Queens',
          image: 'equipe/lyssa.jpeg',
          linkedin: 'https://www.linkedin.com/in/lyssa-lima-brito/',
        },
        {
          name: 'Giovanna Bertoletti',
          stack: 'Vice diretora do Queens',
          image: 'equipe/gio.jpg',
          linkedin: 'https://www.linkedin.com/in/giovanna-bertoletti/',
        },
        {
          name: 'Gabriela Mariano',
          stack: 'Fundadora do Rainbowstack',
          image: 'equipe/gabu.jpg',
          linkedin: 'https://www.linkedin.com/in/gabi-mariano/',
        },
        {
          name: 'João Victor',
          stack: 'Fundador da FullDev Games',
          image: 'equipe/joao.jpg',
          linkedin: 'https://www.linkedin.com/in/jvemmanuell/',
        },
      ],
    },
    {
      title: 'Moderadores',
      members: [
        {
          name: 'Daniel Mesquita',
          stack: 'Moderador na FullDev',
          image: 'equipe/Daniel.jpg',
          linkedin: 'https://www.linkedin.com/in/danielgmesquita',
        },
        {
          name: 'José Henrike',
          stack: 'Moderador na FullDev',
          image: 'equipe/José Henrike.jpg',
          linkedin: 'https://www.linkedin.com/in/josehenrike/',
        },
        {
          name: 'Pablo Henrique',
          stack: 'Moderador na FullDev',
          image: 'equipe/pablo.jpg',
          linkedin: 'https://www.linkedin.com/in/pablo-henrique-245709207/',
        },
        {
          name: 'Fernando Valença',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/fernando.jpg',
          linkedin: 'http://www.linkedin.com.br/in/fernando-valenca',
        },
        {
          name: 'Hernando Junior',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Hernando.jpg',
          linkedin: 'https://www.linkedin.com/in/hernandojunior',
        },
        {
          name: 'Luciana Galdino',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Luciana.jpg',
          linkedin:
            'https://www.linkedin.com/in/lucianagaldino-?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
        },
        {
          name: 'Sofia Vaz',
          stack: 'Desenvolvedor na FullDev',
          image: 'equipe/Sofia.jpg',
          linkedin: 'https://www.linkedin.com/in/sofia-vazxavier',
        },
        {
          name: 'Ana Carolina',
          stack: 'Moderador no Queens',
          image: 'equipe/ana-carolina.jpg',
          linkedin: 'https://www.linkedin.com/in/carolinamerloti',
        },
        {
          name: 'Dalila Castro',
          stack: 'Moderador no Queens',
          image: 'equipe/dalila.jpg',
          linkedin: 'https://www.linkedin.com/in/dalila-castro-moresco/',
        },
        {
          name: 'Lorenna Luize',
          stack: 'Moderador no Queens',
          image: 'equipe/lorena.jpg',
          linkedin: 'https://www.linkedin.com/in/lorenna-dias/',
        },
        {
          name: 'Maria Clara',
          stack: 'Moderador no Queens',
          image: 'equipe/maria-clara.jpg',
          linkedin: 'https://www.linkedin.com/in/maria-clara-silva374',
        },
        {
          name: 'Victoria Mariucha',
          stack: 'Moderador no Queens',
          image: 'equipe/Vitoria.jpg',
          linkedin: 'https://www.linkedin.com/in/victoria-mariucha/',
        },
      ],
    },
  ] as const;
  partnerCards = [
    {
      name: 'Asaas',
      stack: 'Plataforma financeira e operacional para empresas.',
      image: 'logo-asaas.png',
      linkedin: 'https://www.linkedin.com/company/asaasbrasil',
    },
    {
      name: 'HostGator',
      stack: 'Hospedagem de sites, dominios e solucoes para presenca online.',
      image: 'hostgator.png',
      linkedin: 'https://www.linkedin.com/company/hostgator-latam',
    },
    {
      name: 'Web Summit',
      stack: 'Evento internacional de tecnologia e inovação.',
      image: 'web_summit_rio_logo.jpg',
      linkedin: 'https://www.linkedin.com/company/web-summit-rio/',
    },
  ] as const;
  socialChannels = [
    {
      name: 'LinkedIn',
      description:
        'Nosso segundo canal para novidades, parcerias, eventos e movimentações da comunidade.',
      icon: 'linkedin.svg',
      link: 'https://www.linkedin.com/company/comunidadefulldev/posts/?feedView=all',
    },
    {
      name: 'Discord',
      description:
        'Nosso terceiro espaço para trocar ideias, acompanhar conversas e se aproximar da comunidade.',
      icon: 'discord.svg',
      link: 'https://discord.com/invite/2vMkX7kc8t',
    },
  ] as const;
  eventCards: readonly EventCard[] = [];
  eventPosts: readonly EventPost[] = [
    {
      event: 'Web Summit Rio',
      name: 'Lucas Pedro',
      handle: 'devlucaspedro',
      network: 'instagram',
      image: 'eventos/web-summit-rio.jpg',
      link: 'https://www.instagram.com/p/DZe1MneDtUi/?img_index=1',
    },
    {
      event: 'CodeConDev',
      name: 'Lucas Pedro',
      handle: 'devlucaspedro',
      network: 'instagram',
      image: 'eventos/codecondev.jpg',
      link: 'https://www.instagram.com/p/DenJtF5mG4h/?img_index=1',
    },
    {
      event: 'Codecon Summit',
      name: 'João Lima',
      handle: 'joao-lima',
      network: 'linkedin',
      image: 'eventos/codecon.jpg',
      link: 'https://www.linkedin.com/posts/jo%C3%A3o-lima-17937b1a3_codeconsummit-codecon2026-tecnologia-ugcPost-7496356376072572928-L9z8/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC-TFi0BNN_OF01bdq887ZMdViDx0E_pccY',
    },
    {
      event: 'AWS Summit SP',
      name: 'João Vasconcelos',
      handle: 'jvemmanuell',
      network: 'instagram',
      image: 'eventos/aws-summit-sp.jpg',
      link: 'https://www.instagram.com/p/Dc16BzqDg96/?img_index=1',
    },
    {
      event: 'DevFest RJ',
      name: 'Carlos Israel',
      handle: 'carlos-israel',
      network: 'linkedin',
      image: 'eventos/devfest.jpg',
      link: 'https://lnkd.in/p/dhk2W4Bv',
    },
  ] as const;
  activeEventMuralPage = 0;
  readonly eventMuralPageSize = 4;
  readonly botStatusUrl = '/bot/public/status';
  botStatusState = signal<BotStatusState>('loading');
  botStatus = signal<BotStatusResponse | null>(null);
  institutionalContent = {
    eventos: {
      title: 'Eventos',
      description:
        'A FullDev promove encontros, desafios e trocas práticas para conectar a comunidade em torno de aprendizado e colaboração.',
      items: [
        'Workshops e encontros para compartilhar conhecimento.',
        'Hackathons e dinâmicas para resolver problemas em grupo.',
        'Ações especiais da comunidade para estimular networking.',
      ],
    },
    sobre: {
      title: 'Sobre nós',
      description: '',
      items: [
        'A FullDev nasceu em 2024 a partir de um grupo de pessoas que queriam aprender programação, trocar experiências e não caminhar sozinhas na área de tecnologia.',
        'Hoje, somos uma comunidade feita por devs e para devs, reunindo pessoas em diferentes níveis de experiência para compartilhar conhecimento, oportunidades e vivências reais do mercado.',
        'Nosso objetivo é criar um ambiente colaborativo, acessível e ativo, onde dúvidas viram conversas, ideias viram projetos e conexões ajudam pessoas a crescerem profissionalmente.',
        'A comunidade promove eventos, hackathons, indicações de vagas, conteúdos técnicos, ações com parceiros e espaços de networking para aproximar talentos, empresas e iniciativas de tecnologia.',
        'Mais do que um grupo, a FullDev é um ponto de encontro para quem acredita que aprender em comunidade torna a jornada mais leve, prática e cheia de possibilidades.',
      ],
    },
    mural: {
      title: 'Mural de eventos',
      description: '',
      items: [],
    },
    bot: {
      title: 'Status do bot',
      description: '',
      items: [],
    },
    redes: {
      title: 'Redes sociais',
      description:
        'A FullDev se organiza em canais diferentes para facilitar contato, novidades e troca entre membros.',
      items: [
        'LinkedIn é o nosso canal para acompanhar novidades, parceiros e eventos.',
        'Discord é o nosso espaço para conversas, networking e aproximação com a comunidade.',
      ],
    },
    equipe: {
      title: 'Equipe',
      description: '',
      items: [],
    },
    parceiros: {
      title: 'Parceiros',
      description:
        'A FullDev busca conexões com empresas, comunidades e iniciativas que compartilham o interesse em ampliar oportunidades em tecnologia.',
      items: [
        'Parcerias para eventos, ações educacionais e divulgação.',
        'Apoio a iniciativas que gerem valor real para a comunidade.',
        'Construção de pontes entre talentos, conteúdo e mercado.',
        'Para parcerias, entre em contato em lucasdearaujopedrolap@gmail.com.',
      ],
    },
    // loja: {
    //   title: 'Loja',
    //   description: 'Em breve teremos uma loja com produtos exclusivos da FullDev!',
    // },
    // school: {
    //   title: 'School',
    //   description: 'Em breve teremos uma school com cursos exclusivos da FullDev!',
    // }
  } as const;

  constructor() {}

  remainingGroupsCount() {
    return this.modalGroups().length;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openVscodeThemeModal() {
    this.showVscodeThemeModal = true;
  }

  closeVscodeThemeModal() {
    this.showVscodeThemeModal = false;
  }

  openInstitutionalModal(key: InstitutionalKey) {
    this.activeInstitutionalKey = key;
    this.showInstitutionalModal = true;

    if (key === 'mural') {
      this.activeEventMuralPage = 0;
    }

    if (key === 'bot') {
      this.loadBotStatus();
    }
  }

  loadBotStatus() {
    this.botStatusState.set('loading');

    fetch(this.botStatusUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Bot status request failed with ${response.status}`);
        }

        return response.json() as Promise<BotStatusResponse>;
      })
      .then((data) => {
        this.botStatus.set(data);
        this.botStatusState.set('loaded');
      })
      .catch(() => {
        this.botStatusState.set('error');
      });
  }

  closeInstitutionalModal() {
    this.showInstitutionalModal = false;
  }

  activeInstitutionalContent() {
    return this.institutionalContent[this.activeInstitutionalKey];
  }

  activeInstitutionalItems() {
    const content = this.activeInstitutionalContent();
    return 'items' in content ? content.items : this.emptyInstitutionalItems;
  }

  get eventMuralPages(): EventPost[][] {
    const pages: EventPost[][] = [];

    for (let i = 0; i < this.eventPosts.length; i += this.eventMuralPageSize) {
      pages.push(this.eventPosts.slice(i, i + this.eventMuralPageSize));
    }

    return pages;
  }

  showEventMuralPage(index: number) {
    const total = this.eventMuralPages.length;

    if (!total) {
      return;
    }

    this.activeEventMuralPage = (index + total) % total;
  }

  openExternalLink(url: string) {
    if (!url) {
      return;
    }

    window.open(url, '_blank');
  }

  handleSupporterLogoError(event: Event) {
    const image = event.target;

    if (image instanceof HTMLImageElement && image.src !== this.headerLogoDefault) {
      image.src = this.headerLogoDefault;
    }
  }
}
