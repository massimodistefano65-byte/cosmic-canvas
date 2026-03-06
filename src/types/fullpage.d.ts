declare module '@fullpage/react-fullpage' {
  import { Component, ReactNode } from 'react';

  interface FullpageApi {
    moveSectionDown: () => void;
    moveSectionUp: () => void;
    moveTo: (section: number | string, slide?: number) => void;
    silentMoveTo: (section: number | string, slide?: number) => void;
    setAutoScrolling: (active: boolean) => void;
    setFitToSection: (active: boolean) => void;
    setLockAnchors: (active: boolean) => void;
    setAllowScrolling: (active: boolean, directions?: string) => void;
    destroy: (type?: string) => void;
    reBuild: () => void;
    getActiveSection: () => any;
  }

  interface FullpageProps {
    scrollingSpeed?: number;
    easingcss3?: string;
    fitToSectionDelay?: number;
    scrollOverflow?: boolean;
    loopHorizontal?: boolean;
    keyboardScrolling?: boolean;
    animateAnchor?: boolean;
    anchors?: string[];
    css3?: boolean;
    scrollBar?: boolean;
    licenseKey?: string;
    credits?: { enabled: boolean };
    render: (comp: { state: any; fullpageApi: FullpageApi }) => ReactNode;
    onLeave?: (origin: any, destination: any, direction: string) => void;
    afterLoad?: (origin: any, destination: any, direction: string) => void;
    [key: string]: any;
  }

  class ReactFullpage extends Component<FullpageProps> {
    static Wrapper: React.FC<{ children: ReactNode }>;
  }

  export default ReactFullpage;
}
