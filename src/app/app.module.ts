import { BootstrapService } from './core/services/bootstrap.service';

export function initApp(appService: BootstrapService): () => void {
  return () => appService.initialize();
}


