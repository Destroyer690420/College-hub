export type ResourceCategory = "notes" | "pyqs" | "assignments" | "lab_manuals";

export interface Department {
    id: string;
    name: string;
    code: string;
    description: string | null;
    icon: string;
    created_at: string;
}

export interface Subject {
    id: string;
    name: string;
    code: string;
    department_id: string;
    year: number;
    semester: number;
    created_at: string;
}

export interface Resource {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_size: number;
    file_type: string;
    category: ResourceCategory;
    subject_id: string;
    uploaded_by: string | null;
    contributor_name: string;
    avg_rating: number;
    rating_count: number;
    download_count: number;
    created_at: string;
    updated_at: string;
}

export interface Rating {
    id: string;
    resource_id: string;
    user_id: string;
    score: number;
    created_at: string;
}

export interface Report {
    id: string;
    resource_id: string;
    user_id: string;
    reason: string;
    status: string;
    created_at: string;
}

export interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    department_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface SearchResult {
    type: "subject" | "resource";
    id: string;
    title: string;
    subtitle: string;
    href: string;
}

export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
    notes: "Notes",
    pyqs: "Previous Year Questions",
    assignments: "Assignments",
    lab_manuals: "Lab Manuals",
};

export const CATEGORY_COLORS: Record<ResourceCategory, string> = {
    notes: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    pyqs: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    assignments: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    lab_manuals: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};
