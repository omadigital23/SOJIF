import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('cv') as File | null;

        if (!file) {
            return NextResponse.json({ success: false, message: 'Aucun fichier fourni.' }, { status: 400 });
        }

        // Validate file type (PDF only)
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { success: false, message: 'Seuls les fichiers PDF sont acceptés.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, message: 'Le fichier ne doit pas dépasser 5 Mo.' },
                { status: 400 }
            );
        }

        // TODO: Upload to Supabase Storage
        // TODO: Update candidate_documents table
        // TODO: Rate limiting with Upstash

        return NextResponse.json(
            { success: true, message: 'CV uploadé avec succès.' },
            { status: 200 }
        );
    } catch {
        return NextResponse.json({ success: false, message: 'Erreur lors de l\'upload.' }, { status: 500 });
    }
}
