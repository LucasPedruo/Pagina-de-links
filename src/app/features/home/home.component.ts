import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
type InstitutionalKey = 'eventos' | 'sobre' | 'somos' | 'redes' | 'equipe' | 'parceiros';

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
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('partnerContentCarousel') private partnerContentCarousel?: ElementRef<HTMLElement>;

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
  private partnerContentAutoplay?: ReturnType<typeof setInterval>;
  private partnerContentScrollSyncTimeout?: ReturnType<typeof setTimeout>;
  activePartnerContentIndex = 0;
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
  partnerContentCards = [
    {
      partner: 'Asaas',
      title: 'Conta digital PJ completa e sem mensalidade',
      type: 'Benefício',
      description:
        'Ofereça diferentes formas de pagamento, gerencie cobranças, emita notas, antecipe recebíveis e pague fornecedores. Tudo em um só lugar.',
      image: 'logo-asaas.png',
      link: 'https://www.asaas.com/',
    },
    {
      partner: 'HostGator',
      title: 'Hospedagem de sites e Servidor VPS',
      type: 'Cupons',
      description:
        'Hospedagem de sites\nVálido para os planos P, M e Turbo, nos ciclos a partir do semestral\n80% OFF - HOST80COMUNIDADE\n\nServidor VPS\nVálido para os planos NVMe 2, 4, 8 e 12, nos ciclos a partir do anual\n45% OFF - VPS45COMUNIDADE',
      image: 'hostgator.png',
      link: 'https://www.hostgator.com.br/',
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
    somos: {
      title: 'O que somos',
      description: '',
      items: [
        'Somos um grupo, quase uma família, que compartilha e se ajuda dentro dos grupos do WhatsApp.',
        'Participamos de eventos conseguindo cortesias através de parceiros da comunidade.',
      ],
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

  ngAfterViewInit() {
    this.startPartnerContentAutoplay();
  }

  ngOnDestroy() {
    this.stopPartnerContentAutoplay();

    if (this.partnerContentScrollSyncTimeout) {
      clearTimeout(this.partnerContentScrollSyncTimeout);
    }
  }

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

  openExternalLink(url: string) {
    if (!url) {
      return;
    }

    window.open(url, '_blank');
  }

  showPartnerContent(index: number, resetAutoplay = true) {
    const carousel = this.partnerContentCarousel?.nativeElement;
    const total = this.partnerContentCards.length;

    if (!total) {
      return;
    }

    const normalizedIndex = (index + total) % total;
    this.activePartnerContentIndex = normalizedIndex;

    if (carousel) {
      const target = carousel.children.item(normalizedIndex);

      if (target instanceof HTMLElement) {
        carousel.scrollTo({
          left: target.offsetLeft,
          behavior: 'smooth',
        });
      }
    }

    if (resetAutoplay) {
      this.startPartnerContentAutoplay();
    }
  }

  syncPartnerContentIndex(carousel: HTMLElement) {
    if (this.partnerContentScrollSyncTimeout) {
      clearTimeout(this.partnerContentScrollSyncTimeout);
    }

    this.partnerContentScrollSyncTimeout = setTimeout(() => {
      this.updatePartnerContentIndexFromScroll(carousel);
    }, 80);
  }

  private updatePartnerContentIndexFromScroll(carousel: HTMLElement) {
    const cards = Array.from(carousel.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );

    if (!cards.length) {
      return;
    }

    const closestIndex = cards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - carousel.scrollLeft);
      const closestDistance = Math.abs(cards[closest].offsetLeft - carousel.scrollLeft);

      return currentDistance < closestDistance ? index : closest;
    }, 0);

    this.activePartnerContentIndex = closestIndex;
  }

  private startPartnerContentAutoplay() {
    if (typeof window === 'undefined' || this.partnerContentCards.length <= 1) {
      return;
    }

    this.stopPartnerContentAutoplay();
    this.partnerContentAutoplay = setInterval(() => {
      this.showPartnerContent(this.activePartnerContentIndex + 1, false);
    }, 5000);
  }

  private stopPartnerContentAutoplay() {
    if (this.partnerContentAutoplay) {
      clearInterval(this.partnerContentAutoplay);
      this.partnerContentAutoplay = undefined;
    }
  }

  handleSupporterLogoError(event: Event) {
    const image = event.target;

    if (image instanceof HTMLImageElement && image.src !== this.headerLogoDefault) {
      image.src = this.headerLogoDefault;
    }
  }
}
