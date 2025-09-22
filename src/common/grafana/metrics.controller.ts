import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import type { Response } from 'express';

@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('/metrics')
  async metrics(@Res() res: Response) {
    try {
      res.set('Content-Type', this.metricsService.getContentType());
      res.end(await this.metricsService.getMetrics());
    } catch (err) {
      res.status(500).end(err);
    }
  }
}
