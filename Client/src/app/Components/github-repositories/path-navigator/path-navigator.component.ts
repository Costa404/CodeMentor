import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-path-navigator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './path-navigator.component.html',
  styleUrls: ['./path-navigator.component.css'],
})
export class PathNavigatorComponent implements OnInit {
  pathParts: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(() => {
      const fullPath = window.location.pathname;
      this.pathParts = fullPath.split('/').filter((part) => part !== '');
      console.log('📂 Path Parts Atualizados:', this.pathParts);
    });
  }

  getPathLink(index: number): string[] {
    const fullPath = this.pathParts.slice(0, index + 1).join('/');
    return [`/${fullPath}`];
  }
}
