/**
 * Service for handling project-related API calls
 */

import { apiClient } from './apiClient';

export interface Project {
  id?: number;
  name: string;
  description: string;
  developer_name?: string;
  developer_description?: string;
  image?: string;
}

export interface ProjectsResponse {
  data: Project[];
}

export interface ProjectResponse {
  data: Project;
}

export interface ProjectCreateRequest {
  name: string;
  description: string;
  developer_id?: number;
}

export const projectService = {
  /**
   * Get all projects
   */
  async getProjects(): Promise<ProjectsResponse> {
    return apiClient.get<ProjectsResponse>('project');
  },

  /**
   * Get a single project by ID
   */
  async getProject(id: number): Promise<ProjectResponse> {
    return apiClient.get<ProjectResponse>(`project/${id}`);
  },

  /**
   * Get a project by slug (name)
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      // Convert slug to a searchable name (e.g., "cairo-gate" to "Cairo Gate")
      const searchName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Get all projects
      const response = await this.getProjects();
      
      if (response?.data && response.data.length > 0) {
        // Find project that matches the slug
        const matchingProject = response.data.find(project => 
          project.name.toLowerCase().includes(slug.replace(/-/g, ' ')) ||
          project.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        return matchingProject || null;
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching project by slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Create a new project
   */
  async createProject(data: ProjectCreateRequest): Promise<ProjectResponse> {
    return apiClient.post<ProjectResponse>('project', data);
  }
};
